const STORAGE_KEY = "black_diary_user_id";
const PREFIX = "user_";

function createSuffix(length = 8) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, length);
  }

  return Math.random().toString(36).slice(2, 2 + length);
}

export function createUserId() {
  return `${PREFIX}${createSuffix(8)}`;
}

export function getOrCreateUserId() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing && existing.startsWith(PREFIX)) {
      return existing;
    }

    const nextId = createUserId();
    window.localStorage.setItem(STORAGE_KEY, nextId);
    return nextId;
  } catch {
    return createUserId();
  }
}
