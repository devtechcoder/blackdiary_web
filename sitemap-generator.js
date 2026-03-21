const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");
const { publicRoutes } = require("./src/routes");

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://blackdiary.vercel.app",
  });

  publicRoutes.forEach((route) => {
    sitemap.write({ url: route.path });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  const dest = resolve(__dirname, "public", "sitemap.xml");
  createWriteStream(dest).write(xml);
  console.log("✅ Sitemap generated at:", dest);
}

generateSitemap();
