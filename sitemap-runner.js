// Run the sitemap generator directly without transpiling the app code.
// This avoids loading client-only components and binary assets during Node runs.
require("./sitemap-generator.js");
