import { company, contactChannels, footerNav, socialLinks } from "../data/company";
import BrandMark from "./BrandMark";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="brand">
              <BrandMark className="brand__mark" />
              <span className="brand__text">
                <span className="brand__name">{company.name}</span>
                <span className="brand__sub">Charcoal &amp; Trade</span>
              </span>
            </span>
            <p className="footer__blurb">{company.tagline}</p>

            {socialLinks.length > 0 ? (
              <ul className="footer__links footer__links--inline">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} target="_blank" rel="noreferrer noopener">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h3>Navigate</h3>
            <ul className="footer__links">
              {footerNav.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href}>{item.label}</a>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          {/* Only verified details. An unverified channel is absent rather than
              rendered as a "to be published" line. */}
          <div className="footer__col">
            <h3>Contact</h3>
            <address className="footer__contact">
              {contactChannels.map((channel) => (
                <p key={channel.id}>
                  {channel.href ? (
                    <a href={channel.href}>{channel.value}</a>
                  ) : (
                    channel.value
                  )}
                </p>
              ))}
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="footer__legal">
            <a href="#top">Back to top</a>
          </p>
        </div>
      </div>
    </footer>
  );
}