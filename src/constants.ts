// ── Application identity ────────────────────────────────────────────────────
export const APP_NAME    = 'SMART Collection System';
export const APP_TAGLINE = 'Customer Management System';
export const APP_VERSION = 'v0.1.0';

// ── Auth ────────────────────────────────────────────────────────────────────
export const AUTH_STORE_KEY = 'collector-auth';

// ── API ─────────────────────────────────────────────────────────────────────
export const API_BASE_URL = '/api';

// ── Routes ──────────────────────────────────────────────────────────────────
export const ROUTES = {
  LOGIN:             '/login',
  DASHBOARD:         '/dashboard',
  ORGANIZATIONS:     '/organizations',
  ORGANIZATION_NEW:  '/organizations/new',
  ORGANIZATION_BY_ID: (id: number | string) => `/organizations/${id}`,
  ORGANIZATION_EDIT:  (id: number | string) => `/organizations/${id}/edit`,
} as const;
