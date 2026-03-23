export const config = {
  API_BASEURL_URL: process.env.REACT_APP_ENV === "development" ? process.env.REACT_APP_DEV_API_BASE_URL : process.env.REACT_APP_PROD_API_BASE_URL,
  ASSET_URL:
    process.env.REACT_APP_ENV === "development"
      ? process.env.REACT_APP_DEV_ASSET_URL || process.env.REACT_APP_DEV_API_LOCAL_ASSET_URL || process.env.REACT_APP_DEV_API_BASE_URL
      : process.env.REACT_APP_PROD_ASSET_URL || process.env.REACT_APP_PROD_API_ASSET_URL || process.env.REACT_APP_PROD_API_BASE_URL,
};
