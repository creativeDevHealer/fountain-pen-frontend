import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Auth helpers ---
const TOKEN_KEY = 'pen_admin_token';

export function saveAuthToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch (_e) {}
  try { window.dispatchEvent(new Event('auth-token-changed')); } catch (_e) {}
}

export function getAuthToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch (_e) { return null; }
}

export function clearAuthToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch (_e) {}
  try { window.dispatchEvent(new Event('auth-token-changed')); } catch (_e) {}
}

export function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getAuthToken();
  const headers = new Headers(init.headers || {});
  if (token) headers.set('Authorization', 'Bearer ' + token);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  // Bypass ngrok browser warning interstitial for API calls
  try {
    const urlStr = typeof input === 'string' ? input : (input as URL).toString();
    if (API_BASE.includes('ngrok') || /ngrok/i.test(urlStr)) {
      headers.set('ngrok-skip-browser-warning', '1');
    }
  } catch (_e) {}
  return fetch(input, { ...init, headers });
}

// Non-auth API fetch with the same ngrok bypass header
export function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  try {
    const urlStr = typeof input === 'string' ? input : (input as URL).toString();
    if (API_BASE.includes('ngrok') || /ngrok/i.test(urlStr)) {
      headers.set('ngrok-skip-browser-warning', '1');
    }
  } catch (_e) {}
  return fetch(input, { ...init, headers });
}

export const API_BASE = 'https://jennie-conceptive-uncomprehendingly.ngrok-free.app';