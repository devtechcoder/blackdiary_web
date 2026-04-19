import black_white_logo from "../assets/images/brand/favicon.svg";

const createSEOEntry = ({ title, description, keywords, url }) => ({
  primary: {
    title,
    description,
    keywords,
  },
  openGraph: {
    title,
    description,
    image: black_white_logo,
    url,
    type: "website",
    site_name: "Black Diary",
  },
  twitter: {
    title,
    description,
    image: black_white_logo,
    url,
    type: "website",
    site_name: "Black Diary",
  },
});

export const SEO = {
  common: {
    title: "Black Diary Shayari – Best Hindi Shayari, Attitude, Love & Sad Quotes",
    robots: "index, follow",
    language: "hi",
    author: "Shivraj Jajra",
    description: "Black Diary – India’s #1 Hindi Shayari Website. पढ़ें Attitude Shayari, Love Shayari, Sad Shayari, Heart Touching Quotes और Romantic Status. रोज़ नई शायरी अपडेट होती है!",
    keywords: "Black Diary, Black Diary Shayari, Hindi Shayari, Attitude Shayari, Love Shayari, Sad Shayari, Romantic Shayari, Hindi Quotes, Attitude Status, Black Diary Quotes",
    image: black_white_logo,
    url: "https://blackdiary.vercel.app/",
    type: "website",
    site_name: "Black Diary - Hindi Shayari Platform",
  },

  // ---------------- HOME PAGE SEO ----------------
  home: {
    primary: {
      title: "Black Diary – Best Hindi Shayari, Attitude Quotes & Love Status",
      description: "Black Diary पर पढ़ें बेहतरीन Hindi Shayari: Attitude Shayari, Love Shayari, Sad Shayari, Romantic Quotes, Emotional Lines और Friendship Status. Daily नई शायरी!",
      keywords: "Black Diary Shayari, Hindi Shayari, Attitude Shayari, Love Quotes, Sad Shayari, Romantic Quotes, Friendship Shayari, Boys Attitude Status",
    },

    openGraph: {
      title: "Black Diary – Hindi Shayari, Quotes & Attitude Status",
      description: "India की सबसे बेहतरीन Shayari website. पढ़ें Attitude, Love, Sad और Romantic Shayari. अपनी खुद की Shayari लिखें और शेयर करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/",
      type: "website",
      site_name: "Black Diary",
    },

    twitter: {
      title: "Black Diary – Read, Write & Share Shayari",
      description: "Black Diary पर पढ़ें, लिखें, लाइक करें और Shayari शेयर करें। Hindi Shayari का सबसे बड़ा प्लेटफॉर्म।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- LOGIN PAGE SEO ----------------
  login: {
    primary: {
      title: "Login – Black Diary",
      description: "Login करें और पढ़ें, लिखें, लाइक करें, कमेंट करें और Shayari शेयर करें। Black Diary पर अपना अकाउंट एक्सेस करें।",
      keywords: "login, shayari login, hindi shayari account, black diary login",
    },
    openGraph: {
      title: "Login – Black Diary",
      description: "अपने Black Diary अकाउंट में लॉगिन करें और Hindi Shayari पढ़ें व लिखें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/login",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Login – Black Diary",
      description: "Black Diary login करें और Shayari व Quotes का आनंद लें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/login",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- SIGNUP PAGE SEO ----------------
  signup: {
    primary: {
      title: "Sign Up – Black Diary",
      description: "Black Diary से जुड़ें और Shayari, Quotes, Ghazals पढ़ें, लिखें और शेयर करें। Poetry community का हिस्सा बनें।",
      keywords: "signup, shayari signup, hindi shayari, poetry platform india, black diary signup",
    },
    openGraph: {
      title: "Sign Up – Black Diary",
      description: "Black Diary में खाता बनाएं और Hindi Shayari पढ़ें व लिखें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/signup",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Sign Up – Black Diary",
      description: "Join Black Diary और Hindi Shayari community का हिस्सा बनें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/signup",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- OTP VERIFICATION ----------------
  LoginWithOtp: {
    primary: {
      title: "Verify OTP – Black Diary",
      description: "OTP verify करके अपने Black Diary अकाउंट में सुरक्षित लॉगिन करें।",
      keywords: "otp verification, login otp, secure shayari login, black diary otp",
    },
    openGraph: {
      title: "Verify OTP – Black Diary",
      description: "OTP verify करें और Black Diary अकाउंट एक्सेस करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/login",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Verify OTP – Black Diary",
      description: "अपने Black Diary अकाउंट का OTP confirm करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/login",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- POET DETAILS PAGE ----------------
  PoetDetailsPage: {
    primary: {
      title: "Poet Profile – Black Diary",
      description: "Famous poets की biography और उनकी Shayari व Quotes पढ़ें।",
      keywords: "poet profile, poet shayari, hindi poets, shayari collection, black diary poets",
    },
    openGraph: {
      title: "Poet Profile – Black Diary",
      description: "अपने पसंदीदा शायरों की Shayari पढ़ें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/poets",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Poet Profile – Black Diary",
      description: "Poets की Shayari explore करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/poets",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- ALL POETS PAGE ----------------
  AllPoetsPage: {
    primary: {
      title: "All Poets – Black Diary",
      description: "Black Diary पर सभी शायरों की लिस्ट ब्राउज़ करें और उनकी Shayari पढ़ें।",
      keywords: "all poets list, hindi poets, ghazal writers, shayari artists, black diary poets",
    },
    openGraph: {
      title: "All Poets – Black Diary",
      description: "Poets की पूरी सूची ब्राउज़ करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/poets",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "All Poets – Black Diary",
      description: "Hindi Shayari poets explore करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/poets",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- OCCASION PAGE ----------------
  viewAllOccasionsPage: {
    primary: {
      title: "Occasion Shayari – Black Diary",
      description: "Birthday, Festivals और हर मौके के लिए Shayari और Quotes खोजें।",
      keywords: "occasion shayari, festival quotes, birthday shayari, diwali shayari, new year quotes",
    },
    openGraph: {
      title: "Occasion Shayari – Black Diary",
      description: "हर festival और special moment के लिए best Shayari collection।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/occasion",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Occasion Shayari – Black Diary",
      description: "हर occasion की Shayari पढ़ें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/occasion",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- OCCASION DETAILS PAGE ----------------
  occasionDetailsPage: {
    primary: {
      title: "Special Occasion Shayari – Black Diary",
      description: "इस खास मौके के लिए बेहतरीन Shayari और Quotes खोजें।",
      keywords: "special occasion shayari, festival poetry, celebration quotes",
    },
    openGraph: {
      title: "Special Occasion Shayari – Black Diary",
      description: "Occasion based Shayari पढ़ें और शेयर करें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/occasion",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Special Occasion Shayari – Black Diary",
      description: "हर खास moment की Shayari पाएं।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/occasion",
      type: "website",
      site_name: "Black Diary",
    },
  },

  // ---------------- SUB CATEGORY PAGE ----------------
  subCategoryDetailsPage: {
    primary: {
      title: "Shayari by Category – Black Diary",
      description: "Love, Sad, Attitude, Motivation और अन्य categories में Shayari explore करें।",
      keywords: "shayari categories, love shayari, sad shayari, motivational quotes, category based shayari",
    },
    openGraph: {
      title: "Shayari by Category – Black Diary",
      description: "Category wise Shayari collection जैसे Love, Sadness और Motivation।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/sub-category/details",
      type: "website",
      site_name: "Black Diary",
    },
    twitter: {
      title: "Shayari by Category – Black Diary",
      description: "Category wise Shayari search करें और पढ़ें।",
      image: black_white_logo,
      url: "https://blackdiary.vercel.app/sub-category/details",
      type: "website",
      site_name: "Black Diary",
    },
  },

  viewAllSubCategoryPage: createSEOEntry({
    title: "Browse Shayari Categories - Black Diary",
    description: "Black Diary par sabhi Shayari categories aur sub-categories browse karein aur apne mood ke hisaab se content explore karein.",
    keywords: "shayari sub categories, browse shayari topics, hindi shayari categories, black diary categories",
    url: "https://blackdiary.vercel.app/sub-categories",
  }),

  profilePage: createSEOEntry({
    title: "Profile - Black Diary",
    description: "Black Diary writer profile dekhein, unki Shayari, posts, followers aur poetic identity explore karein.",
    keywords: "black diary profile, writer profile, poet profile, user shayari profile",
    url: "https://blackdiary.vercel.app/",
  }),

  searchPage: createSEOEntry({
    title: "Search - Black Diary",
    description: "Black Diary par accounts, occasions, albums aur Shayari search karein aur nayi poetic discoveries tak pahunchein.",
    keywords: "search shayari, search poets, black diary search, discover shayari accounts",
    url: "https://blackdiary.vercel.app/search",
  }),

  feedPage: createSEOEntry({
    title: "Feed - Black Diary",
    description: "Black Diary feed me trending Shayari aur posts padhein, like karein aur naye alfaazon ko discover karein.",
    keywords: "shayari feed, posts feed, trending shayari, black diary feed",
    url: "https://blackdiary.vercel.app/feed",
  }),

  diaryByTypePage: createSEOEntry({
    title: "Diary Collections - Black Diary",
    description: "Black Diary par type-based diary collections browse karein aur apni pasand ki Shayari aur posts dekhein.",
    keywords: "diary by type, shayari collection, liked diaries, trending diaries, black diary",
    url: "https://blackdiary.vercel.app/diary-by-type",
  }),

  postDiaryPage: createSEOEntry({
    title: "Publish Shayari - Black Diary",
    description: "Black Diary par apni Shayari, quotes aur poetry publish karein aur poetic community ke saath share karein.",
    keywords: "publish shayari, write shayari online, create poetry post, black diary publish",
    url: "https://blackdiary.vercel.app/publish",
  }),

  loginDiaryPage: createSEOEntry({
    title: "Login - Black Diary",
    description: "Black Diary account me login karein aur apni Shayari journey continue karein.",
    keywords: "black diary login, login diary, shayari account login",
    url: "https://blackdiary.vercel.app/login-diary",
  }),

  signUpDiaryPage: createSEOEntry({
    title: "Sign Up - Black Diary",
    description: "Black Diary par naya account banayein aur Shayari, quotes aur poetry world ka hissa banein.",
    keywords: "black diary signup, sign up diary, poetry account signup",
    url: "https://blackdiary.vercel.app/signUp-diary",
  }),

  leadershipPage: createSEOEntry({
    title: "Leadership - Black Diary",
    description: "Black Diary ki leadership team aur vision ke baare me jaaniye jo poetry platform ko shape deti hai.",
    keywords: "black diary leadership, company leadership, poetry platform team",
    url: "https://blackdiary.vercel.app/leadership",
  }),

  aboutUsPage: createSEOEntry({
    title: "About Us - Black Diary",
    description: "Black Diary ke mission, vision aur Hindi Shayari community ke liye hum kya build kar rahe hain, ye jaaniye.",
    keywords: "about black diary, black diary mission, shayari platform about us",
    url: "https://blackdiary.vercel.app/about-us",
  }),

  brandPage: createSEOEntry({
    title: "Brand - Black Diary",
    description: "Black Diary brand identity, visual language aur poetic platform ki branding philosophy explore karein.",
    keywords: "black diary brand, brand identity, black diary logo, poetry platform branding",
    url: "https://blackdiary.vercel.app/brand",
  }),

  workingAtBlackDiaryPage: createSEOEntry({
    title: "Working at Black Diary - Black Diary",
    description: "Black Diary ke saath work culture, opportunities aur creative environment ke baare me jaaniye.",
    keywords: "working at black diary, careers black diary, creative jobs, poetry startup culture",
    url: "https://blackdiary.vercel.app/working-at-black-diary",
  }),

  safetySupportPage: createSEOEntry({
    title: "Safety Support - Black Diary",
    description: "Black Diary par support aur safety resources dekhein taaki aap platform ko secure tareeke se use kar saken.",
    keywords: "black diary support, safety support, shayari platform help",
    url: "https://blackdiary.vercel.app/safety-support",
  }),

  safetyToolsPage: createSEOEntry({
    title: "Safety Tools - Black Diary",
    description: "Black Diary safety tools aur reporting features ke baare me jaaniye jo platform experience ko secure banate hain.",
    keywords: "safety tools, black diary safety, reporting tools, secure poetry platform",
    url: "https://blackdiary.vercel.app/safety-tools",
  }),

  privacyToolsPage: createSEOEntry({
    title: "Privacy Tools - Black Diary",
    description: "Black Diary par privacy tools aur account visibility controls ko samjhein aur apna data better manage karein.",
    keywords: "privacy tools, black diary privacy, account privacy controls, user privacy",
    url: "https://blackdiary.vercel.app/privacy-tools",
  }),

  accountSecurityPage: createSEOEntry({
    title: "Account Security - Black Diary",
    description: "Black Diary account security settings aur protection tips ke saath apna profile safe rakhein.",
    keywords: "account security, black diary security, secure account tips, shayari account security",
    url: "https://blackdiary.vercel.app/account-security",
  }),

  faqPage: createSEOEntry({
    title: "FAQ - Black Diary",
    description: "Black Diary ke frequently asked questions padhein aur platform, content aur usage se jude quick answers paayen.",
    keywords: "black diary faq, help center, frequently asked questions, black diary support",
    url: "https://blackdiary.vercel.app/faq",
  }),

  privacyPolicyPage: createSEOEntry({
    title: "Privacy Policy - Black Diary",
    description: "Black Diary privacy policy padhein aur samjhein ki hum aapke data ko kaise collect, use aur protect karte hain.",
    keywords: "privacy policy, black diary privacy policy, user data policy",
    url: "https://blackdiary.vercel.app/privacy-policy",
  }),

  termsAndConditionsPage: createSEOEntry({
    title: "Terms and Conditions - Black Diary",
    description: "Black Diary terms and conditions padhein aur platform ke usage rules aur guidelines ko samjhein.",
    keywords: "terms and conditions, black diary terms, platform rules, shayari platform terms",
    url: "https://blackdiary.vercel.app/terms-and-conditions",
  }),

  sitemapPage: createSEOEntry({
    title: "Sitemap - Black Diary",
    description: "Black Diary website ke important sections aur pages ka sitemap browse karein.",
    keywords: "black diary sitemap, website pages, shayari sitemap",
    url: "https://blackdiary.vercel.app/sitemap",
  }),

  contactUsPage: createSEOEntry({
    title: "Contact Black Diary Support Team",
    description: "Reach the Black Diary support team for feedback, partnership requests, bug reports, and general enquiries.",
    keywords: "black diary contact, black diary support, feedback, partnership enquiries, business queries, contact us",
    url: "https://blackdiary.vercel.app/contact-us",
  }),

  goAdsPage: createSEOEntry({
    title: "Ads and Promotions - Black Diary",
    description: "Black Diary promotions aur advertising related content explore karein.",
    keywords: "black diary ads, promotions, advertising page",
    url: "https://blackdiary.vercel.app/go",
  }),

  editProfilePage: createSEOEntry({
    title: "Edit Profile - Black Diary",
    description: "Black Diary profile details, display info aur personal identity settings update karein.",
    keywords: "edit profile, black diary profile settings, update profile",
    url: "https://blackdiary.vercel.app/account/edit-profile",
  }),

  qrCodeDownloadPage: createSEOEntry({
    title: "QR Code - Black Diary",
    description: "Black Diary profile QR code generate ya download karein aur apna poetic profile share karein.",
    keywords: "profile qr code, black diary qr, share profile qr",
    url: "https://blackdiary.vercel.app/qr",
  }),

  loginActivityPage: createSEOEntry({
    title: "Login Activity - Black Diary",
    description: "Black Diary account ki login activity aur active sessions monitor karein.",
    keywords: "login activity, active sessions, black diary account access",
    url: "https://blackdiary.vercel.app/account/login-activity",
  }),

  notificationPermissionPage: createSEOEntry({
    title: "Notification Settings - Black Diary",
    description: "Black Diary notification permissions aur alerts preferences manage karein.",
    keywords: "notification settings, black diary notifications, alerts preferences",
    url: "https://blackdiary.vercel.app/account/notification-permission",
  }),

  blockAccountPage: createSEOEntry({
    title: "Blocked Accounts - Black Diary",
    description: "Black Diary par blocked accounts list manage karein aur apni interaction safety control karein.",
    keywords: "blocked accounts, black diary block list, account safety",
    url: "https://blackdiary.vercel.app/account/block-account",
  }),

  accountPrivacyPage: createSEOEntry({
    title: "Account Privacy - Black Diary",
    description: "Black Diary account privacy settings manage karein aur apne profile visibility controls update karein.",
    keywords: "account privacy, black diary privacy settings, profile visibility",
    url: "https://blackdiary.vercel.app/account/privacy-account",
  }),

  manageAccountPage: createSEOEntry({
    title: "Manage Account - Black Diary",
    description: "Black Diary account controls, preferences aur management options ko ek jagah se access karein.",
    keywords: "manage account, black diary account settings, user preferences",
    url: "https://blackdiary.vercel.app/account/manage-account",
  }),

  passwordSecurityPage: createSEOEntry({
    title: "Password and Security - Black Diary",
    description: "Black Diary account password update karein aur apni security settings manage karein.",
    keywords: "password security, change password, black diary account security",
    url: "https://blackdiary.vercel.app/account/password-security",
  }),

  personalDetailsPage: createSEOEntry({
    title: "Personal Details - Black Diary",
    description: "Black Diary account ke personal details aur identity information ko review ya update karein.",
    keywords: "personal details, account details, black diary profile info",
    url: "https://blackdiary.vercel.app/account/personal-details",
  }),

  viewFollowListPage: createSEOEntry({
    title: "Followers and Following - Black Diary",
    description: "Black Diary par followers aur following lists browse karein aur poetic community connections dekhein.",
    keywords: "followers list, following list, black diary social connections, poet followers",
    url: "https://blackdiary.vercel.app/view-follow",
  }),
};

export const DEFAULT_SEO = SEO.common;
