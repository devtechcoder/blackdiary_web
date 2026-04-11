import { DEFAULT_SEO, SEO } from "../constants/seo";

const normalizeSeoSlug = (value = "/") => {
  const rawValue = value.trim();
  if (!rawValue || rawValue === "/") {
    return "/";
  }

  return rawValue.replace(/\/+/g, "/").replace(/^\/?/, "/").replace(/\/$/, "") || "/";
};

export const SEO_ROUTE_FALLBACKS = {
  "/": SEO.home,
  "/about-us": SEO.aboutUsPage,
  "/account-security": SEO.accountSecurityPage,
  "/account/block-account": SEO.blockAccountPage,
  "/account/edit-profile": SEO.editProfilePage,
  "/account/login-activity": SEO.loginActivityPage,
  "/account/manage-account": SEO.manageAccountPage,
  "/account/password-security": SEO.passwordSecurityPage,
  "/account/notification-permission": SEO.notificationPermissionPage,
  "/account/personal-details": SEO.personalDetailsPage,
  "/account/privacy-account": SEO.accountPrivacyPage,
  "/brand": SEO.brandPage,
  "/contact-us": SEO.contactUsPage,
  "/diary-by-type": SEO.diaryByTypePage,
  "/feed": SEO.feedPage,
  "/faq": SEO.faqPage,
  "/go": SEO.goAdsPage,
  "/leadership": SEO.leadershipPage,
  "/login": SEO.login,
  "/login-diary": SEO.loginDiaryPage,
  "/occasion": SEO.viewAllOccasionsPage,
  "/occasion/details": SEO.occasionDetailsPage,
  "/poets": SEO.AllPoetsPage,
  "/privacy-policy": SEO.privacyPolicyPage,
  "/privacy-tools": SEO.privacyToolsPage,
  "/profile": SEO.profilePage,
  "/publish": SEO.postDiaryPage,
  "/qr": SEO.qrCodeDownloadPage,
  "/safety-support": SEO.safetySupportPage,
  "/safety-tools": SEO.safetyToolsPage,
  "/search": SEO.searchPage,
  "/sub-categories": SEO.viewAllSubCategoryPage,
  "/search/sub-category": SEO.viewAllSubCategoryPage,
  "/signup": SEO.signup,
  "/signUp-diary": SEO.signUpDiaryPage,
  "/signUp-otp": SEO.LoginWithOtp,
  "/sitemap": SEO.sitemapPage,
  "/sub-category/details": SEO.subCategoryDetailsPage,
  "/terms-and-conditions": SEO.termsAndConditionsPage,
  "/view-follow": SEO.viewFollowListPage,
  "/working-at-black-diary": SEO.workingAtBlackDiaryPage,
};

export const getSeoFallbackByRoute = (slug) => SEO_ROUTE_FALLBACKS[normalizeSeoSlug(slug)] || DEFAULT_SEO;

export { normalizeSeoSlug };
