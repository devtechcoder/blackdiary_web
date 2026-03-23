const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

// Use a minimal, CommonJS-only list of paths to avoid importing React
// components and assets (images/CSS) when running this script under Node.
const publicRoutes = require("./src/sitemap-paths");

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: "https://blackdiary.vercel.app" });

  publicRoutes.forEach((route) => {
    // route may be a string path
    sitemap.write({ url: typeof route === "string" ? route : route.path });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  const dest = resolve(__dirname, "public", "sitemap.xml");
  createWriteStream(dest).write(xml);
  console.log("✅ Sitemap generated at:", dest);
}

generateSitemap();
