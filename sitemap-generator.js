require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const { publicRoutes } = require("./src/routes.js");
const Sitemap = require("react-router-sitemap").default;
const { createWriteStream } = require("fs");
const { resolve } = require("path");

function generateSitemap() {
  const paths = publicRoutes.map((route) => route.path.replace(/:[^/]+/g, ""));
  const sitemap = new Sitemap(paths.map((path) => ({ id: path, path }))).build("https://blackdiary.vercel.app").toString();

  const dest = resolve(__dirname, "build", "sitemap.xml");
  createWriteStream(dest).write(sitemap);
  console.log(`Sitemap generated at ${dest}`);
}

generateSitemap();
