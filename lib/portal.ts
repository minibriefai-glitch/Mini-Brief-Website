/**
 * Where the web app lives, and its two doors.
 *
 * `NEXT_PUBLIC_PORTAL_URL` is the one place the portal's host is named on
 * this site (Vercel → Environment Variables; inlined at build, so a change
 * needs a redeploy). The paths are the portal's own auth routes
 * (`apps/portal/src/app/login`, `/signup` in the Mini-Brief repo) — never a
 * guess. The fallback is production.
 */
export const PORTAL_URL = (process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://cloud.minibrief.app").replace(/\/+$/, "");

export const PORTAL_SIGN_IN_URL = `${PORTAL_URL}/login`;
export const PORTAL_GET_STARTED_URL = `${PORTAL_URL}/signup`;
