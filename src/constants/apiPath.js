import { notification } from "antd";

let appMode = process.env.REACT_APP_ENV;
let ASSET_URL = "https://api-ap-south-mum-1.openstack.acecloudhosting.com:8080/";
let URL;

console.log("appMode", appMode);

// 3.20.147.34

if (appMode === "development") {
  URL = "http://localhost:7900/api/";
  ASSET_URL = `http://localhost:7900/image/`;

  URL = "https://blackdiary.onrender.com/api/";
  ASSET_URL = `https://blackdiary.onrender.com/image/`;
} else {
  URL = "http://localhost:7900/api/";
  ASSET_URL = `http://localhost:7900/image/`;

  URL = "https://blackdiary.onrender.com/api/";
  ASSET_URL = `https://blackdiary.onrender.com/image/`;
}

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

  globalDownload: "app/url/insta/download",

  // Common APIs
  common: {
    getOccasion: "common/occasion",
    getUserProfile: "common/get-user-profile",
    searchAccount: "common/search",
    categories: "common/categories",
    subCategories: "/common/sub-categories",
    imageUpload: "common/image-upload",
  },
};

export default apiPath;
