require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        alias: {
          // Mock browser-only modules for sitemap generation
          "react-draft-wysiwyg": "./sitemap-mock.js",
          "rc-image": "./sitemap-mock.js",
          "react-quill": "./sitemap-mock.js",
        },
      },
    ],
    [
      "transform-assets",
      {
        extensions: ["css", "scss", "sass", "png", "jpeg", "jpg", "gif", "svg"],
      },
    ],
  ],
  ignore: [/node_modules\/(?!react-router-sitemap)/],
});

require("./sitemap-generator.js");
