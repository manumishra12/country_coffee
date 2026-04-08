const ADMIN_CREDENTIALS = { username: "admin", password: "country2024" };
const AUTH_KEY = "cc-admin-auth";

export interface AdminSession {
  user: string;
  loggedInAt: number;
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const session: AdminSession = { user: username, loggedInAt: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) !== null;
}

export function getSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(AUTH_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "/admin/login";
}
