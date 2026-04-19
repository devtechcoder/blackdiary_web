const SITE_NAME = "Black Diary";
const SITE_URL = "https://blackdiary.vercel.app";
const AUTHOR_NAME = "Shivraj Jajra";
const SUPPORT_EMAIL = "support@blackdiary.app";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`;

const STATIC_FAQ_ITEMS = [
  {
    question: "What is Black Diary?",
    answer: "Black Diary is a Hindi-first poetry and expression platform where readers can explore Shayari, Sher, quotes, and emotional writing in one place.",
  },
  {
    question: "Do I need an account to read Shayari on Black Diary?",
    answer: "No. You can browse public content on Black Diary without creating an account.",
  },
  {
    question: "What kind of content can I find on Black Diary?",
    answer: "You can explore Love Shayari, Sad Shayari, Attitude Shayari, motivational lines, Sher, and occasion-based writing.",
  },
  {
    question: "How are FAQs and content shown in order on the website?",
    answer: "Lower priority numbers appear first, so items with priority 1 are shown at the top before items with higher numbers.",
  },
  {
    question: "Can I search for a specific category or mood?",
    answer: "Yes. Black Diary includes search and exploration features so users can quickly reach the category, sub-category, or emotional theme they want.",
  },
];

const normalizePath = (path = "/") => {
  if (!path || path === "/") return "/";
  return `/${String(path).replace(/^\/+|\/+$/g, "")}`;
};

const createAbsoluteUrl = (path = "/") => `${SITE_URL}${normalizePath(path) === "/" ? "" : normalizePath(path)}`;
const createNodeId = (path, suffix) => `${createAbsoluteUrl(path)}#${suffix}`;

export const getWebsiteSchema = (overrides = {}) => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  ...overrides,
});

export const getOrganizationSchema = (overrides = {}) => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_IMAGE,
  },
  founder: {
    "@type": "Person",
    name: AUTHOR_NAME,
    url: `${SITE_URL}/leadership`,
  },
  sameAs: ["https://instagram.com/black_diary.in"],
  ...overrides,
});

export const getWebPageSchema = ({ path = "/", title, description, ...overrides } = {}) => ({
  "@type": "WebPage",
  "@id": createNodeId(path, "webpage"),
  url: createAbsoluteUrl(path),
  name: title || SITE_NAME,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en",
  ...overrides,
});

export const getCollectionPageSchema = ({ path = "/", title, description, ...overrides } = {}) => ({
  "@type": "CollectionPage",
  "@id": createNodeId(path, "collection"),
  url: createAbsoluteUrl(path),
  name: title,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en",
  ...overrides,
});

export const getAboutPageSchema = ({ path = "/about-us", title, description, ...overrides } = {}) => ({
  "@type": "AboutPage",
  "@id": createNodeId(path, "about"),
  url: createAbsoluteUrl(path),
  name: title,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  ...overrides,
});

export const getContactPageSchema = ({ path = "/contact-us", title, description, ...overrides } = {}) => ({
  "@type": "ContactPage",
  "@id": createNodeId(path, "contact"),
  url: createAbsoluteUrl(path),
  name: title,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
  ...overrides,
});

export const getBreadcrumbListSchema = ({ path = "/contact-us", title = "Contact Us", ...overrides } = {}) => {
  const normalizedPath = normalizePath(path);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: SITE_URL,
    },
  ];

  if (normalizedPath !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: title,
      item: createAbsoluteUrl(normalizedPath),
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": createNodeId(normalizedPath, "breadcrumb"),
    itemListElement: items,
    ...overrides,
  };
};

export const getSearchResultsPageSchema = ({ path = "/search", title, description, ...overrides } = {}) => ({
  "@type": "SearchResultsPage",
  "@id": createNodeId(path, "search-results"),
  url: createAbsoluteUrl(path),
  name: title,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  ...overrides,
});

export const getProfilePageSchema = ({ path = "/", title, description, ...overrides } = {}) => ({
  "@type": "ProfilePage",
  "@id": createNodeId(path, "profile"),
  url: createAbsoluteUrl(path),
  name: title,
  description,
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@type": "Person",
    name: AUTHOR_NAME,
  },
  ...overrides,
});

export const getArticleSchema = ({ path = "/", title, description, ...overrides } = {}) => ({
  "@type": "Article",
  "@id": createNodeId(path, "article"),
  headline: title,
  description,
  mainEntityOfPage: createAbsoluteUrl(path),
  url: createAbsoluteUrl(path),
  image: [DEFAULT_IMAGE],
  author: {
    "@type": "Person",
    name: AUTHOR_NAME,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  ...overrides,
});

export const getFAQPageSchema = ({ path = "/faq", items = STATIC_FAQ_ITEMS, ...overrides } = {}) => ({
  "@type": "FAQPage",
  "@id": createNodeId(path, "faq"),
  url: createAbsoluteUrl(path),
  mainEntity: items.map((item, index) => ({
    "@type": "Question",
    "@id": `${createAbsoluteUrl(path)}#question-${index + 1}`,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
  ...overrides,
});

const routeSchemaBuilders = [
  {
    match: (path) => path === "/",
    build: (path) => [
      getWebPageSchema({
        path,
        title: "Black Diary",
        description: "A modern platform to explore Shayari, Ghazals, Nazms and poetic moments.",
      }),
      getCollectionPageSchema({
        path,
        title: "Black Diary Home",
        description: "Explore featured Shayari, poets, occasions, and poetic collections on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path === "/faq",
    build: (path) => [
      getWebPageSchema({
        path,
        title: "Black Diary FAQ",
        description: "Find quick answers about using Black Diary, exploring content, and understanding how the platform works.",
      }),
      getFAQPageSchema({ path }),
    ],
  },
  {
    match: (path) => path === "/feed",
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Black Diary Feed",
        description: "Read and explore the latest Shayari and post feed on Black Diary.",
      }),
      getArticleSchema({
        path,
        title: "Black Diary Shayari Feed",
        description: "Read and explore the latest Shayari feed on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path === "/about-us",
    build: (path) => [
      getAboutPageSchema({
        path,
        title: "About Black Diary",
        description: "Learn about the mission, vision, and creative purpose behind Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path === "/contact-us",
    build: (path) => [
      getContactPageSchema({
        path,
        title: "Contact Black Diary",
        description: "Reach out to the Black Diary team for support, feedback, or business queries.",
      }),
      getBreadcrumbListSchema({
        path,
        title: "Contact Us",
      }),
    ],
  },
  {
    match: (path) => path === "/poets",
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Black Diary Poets",
        description: "Browse poets and discover their poetic identity and writing style on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/poets/details"),
    build: (path) => [
      getProfilePageSchema({
        path,
        title: "Poet Details",
        description: "Explore a poet profile and related Shayari on Black Diary.",
      }),
      getArticleSchema({
        path,
        title: "Poet Profile on Black Diary",
        description: "Explore a poet profile and related Shayari on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path === "/occasion",
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Occasion Shayari",
        description: "Explore Shayari collections for every occasion on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/occasion/details"),
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Occasion Details",
        description: "Read occasion-based Shayari and themed poetic moments on Black Diary.",
      }),
      getArticleSchema({
        path,
        title: "Occasion Shayari Details",
        description: "Read occasion-based Shayari and themed poetic moments on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path === "/sub-categories" || path === "/search/sub-category",
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Shayari Categories",
        description: "Browse Shayari categories and sub-categories on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/sub-category/details"),
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Category Shayari Details",
        description: "Explore Shayari inside a selected category on Black Diary.",
      }),
      getArticleSchema({
        path,
        title: "Category Shayari on Black Diary",
        description: "Explore Shayari inside a selected category on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path === "/search",
    build: (path) => [
      getSearchResultsPageSchema({
        path,
        title: "Black Diary Search",
        description: "Search accounts, occasions, albums, and Shayari on Black Diary.",
      }),
    ],
  },
  {
    match: (path) =>
      path === "/leadership" ||
      path === "/brand" ||
      path === "/working-at-black-diary" ||
      path === "/privacy-policy" ||
      path === "/privacy-tools" ||
      path === "/safety-support" ||
      path === "/safety-tools" ||
      path === "/account-security" ||
      path === "/terms-and-conditions" ||
      path === "/sitemap" ||
      path === "/go",
    build: (path) => [
      getWebPageSchema({
        path,
        title: `${SITE_NAME} ${path.replace(/\//g, " ").trim()}`.trim(),
        description: `Explore ${path.replace(/\//g, " ").replace(/-/g, " ").trim()} on ${SITE_NAME}.`,
      }),
    ],
  },
  {
    match: (path) => path === "/login" || path === "/login-diary" || path === "/signup" || path === "/signUp-diary" || path.startsWith("/signUp-otp") || path === "/publish",
    build: (path) => [
      getWebPageSchema({
        path,
        title: `${SITE_NAME} Account Access`,
        description: "Access publishing, login, signup, and user journey pages on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/account/"),
    build: (path) => [
      getProfilePageSchema({
        path,
        title: "Black Diary Account Page",
        description: "Manage profile, privacy, account controls, and user settings on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/view-follow"),
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Followers and Following",
        description: "Browse follower and following relationships on Black Diary.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/qr/"),
    build: (path) => [
      getWebPageSchema({
        path,
        title: "Black Diary QR Page",
        description: "View and share QR-related Black Diary profile pages.",
      }),
    ],
  },
  {
    match: (path) => path.startsWith("/diary-by-type"),
    build: (path) => [
      getCollectionPageSchema({
        path,
        title: "Diary by Type",
        description: "Browse Black Diary content by writing type and collection style.",
      }),
    ],
  },
  {
    match: (path) => /^\/[^/]+/.test(path),
    build: (path) => [
      getProfilePageSchema({
        path,
        title: "Black Diary Profile",
        description: "Explore a writer profile and related poetic content on Black Diary.",
      }),
    ],
  },
];

const getPageSpecificSchemas = (pathname = "/") => {
  const normalizedPath = normalizePath(pathname);
  const matchedBuilder = routeSchemaBuilders.find((item) => item.match(normalizedPath));

  if (!matchedBuilder) {
    return [
      getWebPageSchema({
        path: normalizedPath,
        title: SITE_NAME,
        description: "Explore Black Diary.",
      }),
    ];
  }

  return matchedBuilder.build(normalizedPath);
};

export const getSchemaGraph = (pathname = "/") => ({
  "@context": "https://schema.org",
  "@graph": [getWebsiteSchema(), getOrganizationSchema(), ...getPageSpecificSchemas(pathname)],
});

export { AUTHOR_NAME, SITE_NAME, SITE_URL };
