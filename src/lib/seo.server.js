import { cache } from "react";
import { generateSEOMetadata } from "./seo";
import { getSeoFallbackByRoute, normalizeSeoSlug } from "../seo/routes";

const SEO_REVALIDATE_SECONDS = 300;
const SEO_FETCH_TIMEOUT_MS = 2000;

const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }

  if (process.env.REACT_APP_ENV === "development") {
    return process.env.REACT_APP_DEV_API_BASE_URL || "http://localhost:7900/api";
  }

  return process.env.REACT_APP_PROD_API_BASE_URL || process.env.REACT_APP_DEV_API_BASE_URL || "http://localhost:7900/api";
};

const joinUrl = (baseUrl, pathName) => {
  const normalizedBaseUrl = (baseUrl || "").replace(/\/+$/, "");
  const normalizedPathName = pathName.startsWith("/") ? pathName : `/${pathName}`;
  return `${normalizedBaseUrl}${normalizedPathName}`;
};

const shouldSkipRemoteSeoFetch = () =>
  process.env.DISABLE_REMOTE_SEO_FETCH === "true" || process.env.npm_lifecycle_event === "build";

const fetchSeoBySlug = cache(async (slug) => {
  const normalizedSlug = normalizeSeoSlug(slug);
  const baseUrl = getApiBaseUrl();

  if (!baseUrl || shouldSkipRemoteSeoFetch()) {
    return null;
  }

  try {
    const response = await fetch(joinUrl(baseUrl, `/seo/${encodeURIComponent(normalizedSlug)}`), {
      signal: AbortSignal.timeout(SEO_FETCH_TIMEOUT_MS),
      next: {
        revalidate: SEO_REVALIDATE_SECONDS,
        tags: [`seo:${normalizedSlug}`],
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    if (!payload?.status || !payload?.data) {
      return null;
    }

    return payload.data;
  } catch (error) {
    return null;
  }
});

export async function getRouteMetadata(slug, fallbackSeo) {
  const normalizedSlug = normalizeSeoSlug(slug);
  const seo = await fetchSeoBySlug(normalizedSlug);
  return generateSEOMetadata(seo || fallbackSeo || getSeoFallbackByRoute(normalizedSlug));
}
