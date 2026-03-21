import { config } from "../config/config";

let ASSET_URL = "";
let URL;

URL = config.API_BASEURL_URL;
ASSET_URL = config.ASSET_URL;

let apiPath = {
  baseURL: URL,
  assetURL: ASSET_URL,

  //Auth
  login: "app/auth/login",
  googleLogin: "app/auth/google-login",
  profile: "app/auth/profile",
  getLoginAccount: "app/auth/login-account",
  signup: "app/auth/sign-up",
  editProfile: "app/auth/edit-profile",
  editByAction: "app/auth/edit-by-action",
  sendOtp: "app/auth/send-otp",
  verifyOtp: "app/auth/verify-otp",
  getOneUser: "app/auth/get-one",

  //Home
  homeData: "app/home",
  getHomeTopDiary: "app/home/top-diary",

  //Poet Apis
  getPoetData: "app/poet",
  getPoetDetails: "app/poet/view-details",

  //Leadership Apis
  getLeadershipList: "app/leadership",

  //Create Diary
  publish: "app/create-diary/publish",

  //Occasion Apis
  getOccasionData: "app/occasion",
  getOccasionDetails: "app/occasion/view-details",

  // Get Sub - Category Apis
  getSubCategoryDetails: "app/sub-category/view-details",
  listSubCategory: "app/sub-category",

  //Banner List
  listBanner: "app/banner",

  //shayari Apis
  getShayari: "app/shayari",
  getPost: "app/post",

  //Diary Apis
  getDiary: "app/diary",
  getDiaryByType: "app/diary/diary-by-type",

  //Likes
  toggleLikes: "app/like",
  toggleFollow: "app/follow/toggle-follow",
  getFollowers: "app/follow",
  getFollowing: "app/follow",

  //Comments Apis
  getComments: "app/comment",
  addComment: "app/comment/add",

  globalDownload: "app/url/insta/download",

  // Common APIs
  contactEnquiry: "contact-enquiry",

  // Common APIs
  common: {
    getOccasion: "common/occasion",
    getUserProfile: "common/get-user-profile",
    searchAccount: "common/search",
    categories: "common/categories",
    subCategories: "common/sub-categories",
    imageUpload: "common/image-upload",
    getCms: "common/get-cms",
    getMasters: "common/get-masters",
    getSettings: "common/get-settings",
    getSeo: "seo",
  },
};

export default apiPath;
