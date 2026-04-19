export const getCurrentPathWithSearch = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}`;
};

export const getPostLoginRedirectPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  const query = new URLSearchParams(window.location.search);
  const next = query.get("next");

  if (!next) {
    return "/";
  }

  try {
    return decodeURIComponent(next);
  } catch (error) {
    return next;
  }
};
