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

require("./sitemap-generator.js");
