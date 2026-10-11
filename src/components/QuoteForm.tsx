import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, Info, LoaderCircle, Mail, ShieldAlert } from "lucide-react";
import { company, contactChannels } from "../data/company";
import { countryOptions, packagingOptions, quantityOptions } from "../data/faqs";
import { offeredProducts } from "../data/products";

/**
 * Submission endpoint. Set VITE_INQUIRY_ENDPOINT to a serverless function,
 * form service or webhook that returns 2xx on success.
 *
 * With no endpoint configured the form does NOT pretend to have sent anything:
 * it opens the visitor's mail client with the inquiry pre-filled and says so.
 * Nothing is emailed by this site, and no credential ever lives in the bundle.
 */
const ENDPOINT = import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined;
const BUSINESS_EMAIL = contactChannels.find((c) => c.id === "email")?.value ?? null;
const BUSINESS_PHONE = contactChannels.find((c) => c.id === "phone");

/**
 * A hung request would otherwise leave the button disabled on "Submitting…"
 * forever. The form is not mission-critical, so failing fast and telling the
 * visitor to retry beats an indefinite spinner.
 */
const REQUEST_TIMEOUT_MS = 15000;

type Fields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  packaging: string;
  destination: string;
  message: string;
};

/** Neutral defaults. Nothing here guesses what the buyer wants. */
const EMPTY: Fields = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "Not specified",
  product: "Not decided yet",
  quantity: "Not specified",
  packaging: "Not specified",
  destination: "",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

/** Fields carrying a standing hint, so the id can be wired into aria-describedby. */
const HINTS: Partial<Record<keyof Fields, string>> = {
  phone: "Include your country code.",
  message: "Grade, packaging detail, delivery schedule, documentation you need.",
};

// Pragmatic on purpose: rejects real typos without trying to implement RFC 5322.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.company.trim()) errors.company = "Please enter your company name.";
  if (!values.email.trim()) errors.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please enter a valid email address, e.g. name@company.com";
  if (!values.phone.trim()) errors.phone = "Please include a phone number with country code.";
  if (!values.destination.trim())
    errors.destination = "Please tell us the destination port or delivery location.";
  return errors;
}

function buildMessage(v: Fields) {
  return [
    `Business inquiry — ${company.name}`,
    "",
    `Name: ${v.fullName}`,
    `Company: ${v.company}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Country: ${v.country}`,
    "",
    `Product of interest: ${v.product}`,
    `Estimated quantity: ${v.quantity}`,
    `Packaging preference: ${v.packaging}`,
    `Destination: ${v.destination}`,
    "",
    "Additional requirements:",
    v.message || "(none provided)",
  ].join("\n");
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`field${full ? " field--full" : ""}`} data-invalid={error ? "true" : undefined}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          <ShieldAlert size={13} aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }
  | { kind: "info"; message: string };

export default function QuoteForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Honeypot lives outside `Fields` so it can never overwrite a real field.
  const [honeypot, setHoneypot] = useState("");
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const focusFirstInvalid = useRef(false);

  // Runs after React has committed aria-invalid, so the first bad field can
  // actually receive focus. A flag keeps it to the submit that asked for it.
  useEffect(() => {
    if (!focusFirstInvalid.current) return;
    focusFirstInvalid.current = false;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  const set =
    (key: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      // Clear a field's error as soon as the visitor starts correcting it.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  const props = (key: keyof Fields, required = false) => ({
    id: key,
    name: key,
    value: values[key],
    onChange: set(key),
    className: "field__control",
    "aria-invalid": errors[key] ? (true as const) : undefined,
    // The form is noValidate and validates in JS, so the browser's own
    // required state is unavailable. `aria-required` is what tells a screen
    // reader which controls must be filled, and the hint has to be referenced
    // or it is never announced with the field.
    "aria-required": required || undefined,
    "aria-describedby": errors[key]
      ? `${key}-error`
      : HINTS[key]
        ? `${key}-hint`
        : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Guard against double submission from rapid clicks or Enter + click.
    if (inFlight.current) return;

    // Honeypot first, before any validation work. A bot that trips it gets a
    // silent discard regardless of what else it filled in; validating first
    // would hand it an error page and tell it the form is live.
    if (honeypot) {
      setValues(EMPTY);
      setErrors({});
      setStatus({ kind: "idle" });
      return;
    }

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ kind: "error", message: "Please correct the highlighted fields and try again." });
      focusFirstInvalid.current = true;
      return;
    }

    inFlight.current = true;
    setStatus({ kind: "sending" });

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
        // Only a 2xx counts as delivered. Anything else is reported as a
        // failure rather than dressed up as a receipt.
        if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
        setStatus({
          kind: "success",
          message:
            "Your inquiry has been submitted. We will respond with next steps for your requirements.",
        });
        setValues(EMPTY);
      } else if (BUSINESS_EMAIL) {
        const href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
          `Business inquiry — ${values.company}`,
        )}&body=${encodeURIComponent(buildMessage(values))}`;
        window.location.href = href;
        setStatus({
          kind: "info",
          message:
            "Your email client is opening with the inquiry pre-filled. Send that email to reach us — this site has not sent anything by itself.",
        });
      } else {
        // Nothing is configured: refuse to fake a delivery. Point the visitor at
        // a channel that does work rather than leaving them at a dead end.
        const phone = BUSINESS_PHONE?.value;
        setStatus({
          kind: "error",
          message: phone
            ? `Online submission is not switched on for this site, so your inquiry was not sent. Please call us on ${phone} and we will take the details directly.`
            : "Online submission is not switched on for this site, so your inquiry was not sent. Please contact us directly using the details in our contact section.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message:
          "Your inquiry could not be submitted — the request did not complete. Please try again, or call us on the number in our contact section.",
      });
    } finally {
      inFlight.current = false;
    }
  }

  const sending = status.kind === "sending";
  const banner =
    status.kind === "sending"
      ? { cls: "form__status--info", Icon: LoaderCircle, text: "Submitting your inquiry…" }
      : status.kind === "success"
        ? { cls: "form__status--success", Icon: Check, text: status.message }
        : status.kind === "error"
          ? { cls: "form__status--error", Icon: ShieldAlert, text: status.message }
          : status.kind === "info"
            ? { cls: "form__status--info", Icon: Info, text: status.message }
            : null;

  return (
    <form className="form" onSubmit={onSubmit} ref={formRef} noValidate>
      {/* Announces submission outcome to assistive tech. */}
      <div role="status" aria-live="polite" aria-atomic="true">
        {banner ? (
          <p className={`form__status ${banner.cls}`}>
            <banner.Icon size={16} className={sending ? "spinner" : undefined} aria-hidden="true" />
            <span>{banner.text}</span>
          </p>
        ) : null}
      </div>

      <div className="form__grid">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input {...props("fullName", true)} type="text" autoComplete="name" placeholder="Jane Okafor" />
        </Field>

        <Field id="company" label="Company name" required error={errors.company}>
          <input
            {...props("company", true)}
            type="text"
            autoComplete="organization"
            placeholder="Company Ltd."
          />
        </Field>

        <Field id="email" label="Business email" required error={errors.email}>
          <input {...props("email", true)} type="email" autoComplete="email" placeholder="name@company.com" />
        </Field>

        <Field
          id="phone"
          label="Phone number"
          required
          error={errors.phone}
          hint={HINTS.phone}
        >
          <input {...props("phone", true)} type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
        </Field>

        <Field id="country" label="Country">
          <select {...props("country")}>
            {countryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field id="product" label="Product of interest">
          <select {...props("product")}>
            <option value="Not decided yet">Not decided yet</option>
            {offeredProducts.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Multiple products">Multiple products</option>
          </select>
        </Field>

        <Field id="quantity" label="Estimated order quantity">
          <select {...props("quantity")}>
            {quantityOptions.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </Field>

        <Field id="packaging" label="Packaging preference">
          <select {...props("packaging")}>
            {packagingOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field id="destination" label="Destination port or delivery location" required error={errors.destination} full>
          <input {...props("destination", true)} type="text" placeholder="Port, terminal or city, with country" />
        </Field>

        <Field
          id="message"
          label="Additional requirements"
          full
          hint={HINTS.message}
        >
          <textarea
            {...props("message")}
            rows={4}
            placeholder="Anything we should factor into the quotation."
          />
        </Field>
      </div>

      {/* Honeypot: off-screen rather than display:none, so autofill bots fill it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_website">Company website — leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="form__footer">
        <button
          className="btn btn--primary"
          type="submit"
          disabled={sending}
          aria-busy={sending || undefined}
        >
          {sending ? "Submitting…" : "Submit Business Inquiry"}
          {sending ? null : <ArrowRight size={16} className="btn__icon" aria-hidden="true" />}
        </button>
        <p className="form__note">
          <Mail size={12} aria-hidden="true" />{" "}
          {ENDPOINT
            ? "Enquiries go straight to our trade desk."
            : BUSINESS_EMAIL
              ? "Online submission is not switched on, so submitting opens your email client with the inquiry pre-filled. Nothing is sent from this site until you send that email."
              : "Online submission is not switched on for this site, so submitting will not send your inquiry. Please call us instead."}{" "}
          <a href="/privacy.html">How we use your details</a>
        </p>
      </div>
    </form>
  );
}