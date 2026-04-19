import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateLoading } from "../redux/slices/loaderSlice.jsx";
import { useCommonPostMutation } from "../redux/services/api.jsx";
import { useLogout } from "../helper/helper.js";
import { config } from "../config/config.jsx";
import { useFetchCommonDetailsQuery } from "../redux/services/api.jsx";
import { Severty, ShowToast } from "../helper/toast";

export const usePostRequest = () => {
  const dispatch = useDispatch();
  const { handleLogout } = useLogout();
  const [commonPost, { isLoading }] = useCommonPostMutation();

  const post = async ({ baseurl = config.API_BASEURL_URL, url, body = {}, method = "POST" }) => {
    try {
      dispatch(updateLoading({ loading: true }));

      const response = await commonPost({
        baseurl,
        url,
        method,
        body,
      }).unwrap();

      return response;
    } catch (error) {
      if (error?.status === 401 || error?.status === 403 || error?.data?.statusText === "JWT_EXPIRED" || error?.data?.message === "JWT_EXPIRED") handleLogout();
      else throw error;
    } finally {
      dispatch(updateLoading({ loading: false }));
    }
  };

  return { post, isLoading };
};

export const useRequest = (url, options = { skip: false }) => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);
  const { handleLogout } = useLogout();
  const { data, error, isLoading, refetch } = useFetchCommonDetailsQuery({ url }, { skip: options.skip, refetchOnMountOrArgChange: true });

  useEffect(() => {
    dispatch(updateLoading({ loading: isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      setResponse(data);
    }

    if (error) {
      console.log("errorerrorerror--->", error);
      if (error?.status === 401 || error?.status === 403 || error?.data?.statusText === "JWT_EXPIRED" || error?.data?.message === "JWT_EXPIRED") {
        handleLogout();
      } else if (error?.status === 404) {
        ShowToast(error?.data?.message || "Not Found", Severty.ERROR);
      } else if (error?.status) {
        ShowToast(error?.data?.message || "Something went wrong", Severty.ERROR);
      } else {
        ShowToast("Slow Network Speed. Try Again later.", Severty.ERROR);
      }
    }
  }, [data, error]);

  return {
    response,
    loading: isLoading,
    refetch, // optional, in case you want to call API manually
  };
};

export default useRequest;
