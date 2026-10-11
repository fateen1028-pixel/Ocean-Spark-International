/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Endpoint that accepts a JSON POST of the inquiry payload and returns 2xx.
   * Leave unset to fall back to a mailto: handoff with no delivery configured.
   */
  readonly VITE_INQUIRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}