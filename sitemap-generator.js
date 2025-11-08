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

const React = require("react");
const { Route } = require("react-router-dom");
const { publicRoutes } = require("./src/routes.js");
const Sitemap = require("react-router-sitemap").default;
const { createWriteStream } = require("fs");
const { resolve } = require("path");

function generateSitemap() {
  // Create a Route component from your public routes array
  const routes = (
    <Route>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} />
      ))}
    </Route>
  );

  const sitemap = new Sitemap(routes).build("https://blackdiary.vercel.app").toString();
  const dest = resolve(__dirname, "build", "sitemap.xml");
  createWriteStream(dest).write(sitemap);
  console.log(`Sitemap generated at ${dest}`);
}

generateSitemap();
