import PageComponent from "../../src/pageComponents/footer/faq";
import { getRouteMetadata } from "../../src/lib/seo.server";

const FAQ_REVALIDATE_SECONDS = 300;
const FAQ_FETCH_TIMEOUT_MS = 3000;

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

const sortFaqsByPriority = (faqs = []) => [...faqs].sort((a, b) => (a?.priority || 1) - (b?.priority || 1));

const fetchFaqs = async () => {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return [];
  }

  try {
    const response = await fetch(joinUrl(baseUrl, "/app/faq?page=1&pageSize=100"), {
      signal: AbortSignal.timeout(FAQ_FETCH_TIMEOUT_MS),
      next: {
        revalidate: FAQ_REVALIDATE_SECONDS,
        tags: ["faq:active"],
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    if (!payload?.status) {
      return [];
    }

    return sortFaqsByPriority(payload?.data?.docs || []);
  } catch (error) {
    return [];
  }
};

export async function generateMetadata() {
  return getRouteMetadata("/faq");
}

export default async function FaqPage() {
  const faqs = sortFaqsByPriority(await fetchFaqs());
  return <PageComponent initialFaqs={faqs} />;
}
