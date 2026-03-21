const resolveSeoImage = (image) => {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  return image?.src;
};

const parseRobots = (robots) => {
  if (!robots || typeof robots !== "string") {
    return { index: true, follow: true };
  }

  const normalized = robots.toLowerCase();

  return {
    index: !normalized.includes("noindex"),
    follow: !normalized.includes("nofollow"),
  };
};

export function generateSEOMetadata(seo) {
  if (!seo) return {};

  const image = resolveSeoImage(seo.openGraph?.image || seo.twitter?.image || seo.common?.image);
  const canonical = seo.common?.canonical || seo.common?.url || seo.openGraph?.url || seo.twitter?.url;

  return {
    title: seo.primary?.title || seo.common?.title || seo.openGraph?.title || seo.twitter?.title,
    description: seo.primary?.description || seo.common?.description || seo.openGraph?.description || seo.twitter?.description,
    keywords: seo.primary?.keywords || seo.common?.keywords,
    authors: seo.common?.author ? [{ name: seo.common.author }] : undefined,
    robots: parseRobots(seo.common?.robots),
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    openGraph: {
      title: seo.openGraph?.title || seo.primary?.title || seo.common?.title,
      description: seo.openGraph?.description || seo.primary?.description || seo.common?.description,
      url: seo.openGraph?.url || canonical,
      type: seo.openGraph?.type || seo.common?.type || "website",
      siteName: seo.openGraph?.site_name || seo.common?.site_name,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: seo.twitter?.type || "summary_large_image",
      title: seo.twitter?.title || seo.primary?.title || seo.common?.title,
      description: seo.twitter?.description || seo.primary?.description || seo.common?.description,
      site: seo.twitter?.site_name || seo.common?.site_name,
      images: image ? [image] : undefined,
    },
  };
}
