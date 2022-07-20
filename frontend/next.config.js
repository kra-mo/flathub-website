const { PHASE_PRODUCTION_BUILD } = require("next/constants")
const { i18n } = require("./next-i18next.config")
const { withSentryConfig } = require("@sentry/nextjs")

const CONTENT_SECURITY_POLICY = `
  base-uri 'self' ${process.env.NEXT_PUBLIC_SITE_BASE_URI};
  prefetch-src 'self' ${process.env.NEXT_PUBLIC_SITE_BASE_URI};
  default-src 'none';
  form-action 'none';
  script-src 'self' 'sha256-fDVtD703YIdPFRhb6ZJE/SvcwyA7gZRWfRRM6K6r9EA=' https://webstats.gnome.org https://js.stripe.com;
  style-src 'self' 'unsafe-inline' https://dl.flathub.org;
  font-src 'self' https://dl.flathub.org;
  connect-src 'self' https://flathub.org https://webstats.gnome.org https://api.stripe.com;
  img-src 'self' https://dl.flathub.org https://webstats.gnome.org https://avatars.githubusercontent.com https://gitlab.com https://gitlab.gnome.org https://lh3.googleusercontent.com https://secure.gravatar.com data:;
  frame-ancestors 'none';
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
`
  .replace(/\s{2,}/g, " ")
  .trim()

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = (phase) =>
  withSentryConfig(
    {
      i18n,
      images: {
        domains: [
          "flathub.org",
          "dl.flathub.org",
          "avatars.githubusercontent.com",
          "gitlab.com",
          "gitlab.gnome.org",
          "lh3.googleusercontent.com",
          "secure.gravatar.com",
        ],
      },
      swcMinify: true,
      output: "standalone",
      async redirects() {
        return [
          {
            source: "/home",
            destination: "/",
            permanent: true,
          },
        ]
      },
      async headers() {
        return [
          {
            source: "/:path*",
            headers: [
              {
                key: "X-Frame-Options",
                value: "Deny",
              },
              {
                key: "X-XSS-Protection",
                value: "1; mode=block",
              },
              {
                key: "X-Content-Type-Options",
                value: "nosniff",
              },
              {
                key: "Referrer-Policy",
                value: "strict-origin-when-cross-origin",
              },
              {
                key: "Content-Security-Policy",
                value:
                  /**
                   * For testing adjustments use https://addons.mozilla.org/en-GB/firefox/addon/laboratory-by-mozilla/
                   * (which allows you to overwrite the Content Security Policy of a particular website).
                   *
                   * Do not add `unsafe-inline` to `script-src`, as we are using dangerouslySetInnerHTML in a few places,
                   * which makes us vulnerable to arbitrary code execution if we receive unsanitized data from the APIs.
                   *
                   * For the development environment we either need to maintain a separate CSP or disable it altogether.
                   * This is because it makes use of `eval` and other features that we don't want to allow in the production environment.
                   */
                  phase === PHASE_PRODUCTION_BUILD
                    ? CONTENT_SECURITY_POLICY
                    : "",
              },
            ],
          },
        ]
      },
    },
    sentryWebpackPluginOptions,
  )
