require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "transform-assets",
      {
        extensions: ["css", "scss", "sass", "png", "jpeg", "jpg", "gif", "svg"],
      },
    ],
  ],
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
