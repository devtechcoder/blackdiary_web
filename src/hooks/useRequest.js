import axios from "axios";
import apiPath from "../constants/apiPath";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppStateContext } from "../context/AppContext";
import { Severty, ShowToast } from "../helper/toast";
import { useQuery, useMutation } from "@tanstack/react-query";

const client = axios.create({
  baseURL: apiPath.baseURL,
});

export const useRequest = () => {
  const { logout } = useContext(AuthContext);

  const request = async ({ url, method: tmethod, data, onSuccess, onError, header, onErrorSubmit }) => {
    const method = tmethod.trim().toUpperCase();
    console.log(method);
    let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

    console.log(token);

    const headers = {
      ...header,
      Authorization: `Bearer ${token}`,
      country_id: "646b2e0f46865f1f65565346",
    };

    try {
      const response = await client({
        url,
        method,
        data,
        headers: { ...headers },
      });

      if (onSuccess) {
        onSuccess(response.data);
        console.log(" onSuccess(response.data);", response?.data);
      } else {
        onErrorSubmit(response.data);
        console.log(" onErrorSubmit(response.data);", response?.data);
      }
      return response.data;
    } catch (err) {
      console.log(err, "Error");
      if (err?.response?.code === "ERR_NETWORK") {
        console.log("ErrorNetwork");
      }
      if (err?.response?.status === 401) {
        logout();
      }
      if (err?.response?.status === 403) {
        logout();
      }
      if (err?.response?.data?.message === "jwt expired") {
        logout();
      }
      if (err?.response?.data?.message === "Un-Authorized User") {
        console.log("--------------------------------------------logotu");
        logout();
      }

      // if (err?.response?.status === 400) {
      //   if (err.response.data?.errors?.length) {
      //     err.response.data?.errors?.map((item) =>
      //       ShowToast(item?.message, Severty.ERROR),
      //     );
      //   }
      // }

      if (onError) {
        console.log(err);
        onError(err);
      }
      // throw err;
    }
  };

  return { request };
};

export const useGetApi = ({ queryKey, endpoint, enabled = true, params = {}, headers = {} }) => {
  const { logout } = useContext(AuthContext);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${apiPath.baseURL}${endpoint}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });

    return response.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [queryKey, params], // unique key with params
    queryFn: fetchData,
    enabled, // control whether to fetch or not
    onError: (err) => {
      console.error("Query Error:", err);

      if (err?.code === "ERR_NETWORK") {
        ShowToast("Network error, please check your internet.", "error");
      }
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        ShowToast("Session expired, please login again.", "error");
        logout();
      }
      if (err?.response?.data?.message === "jwt expired") {
        ShowToast("Session expired! Please login again.", "error");
        logout();
      }
      if (err?.response?.data?.message === "Un-Authorized User") {
        ShowToast("Unauthorized access detected!", "error");
        logout();
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const usePostApi = ({ endpoint, onSuccess, onError }) => {
  const { logout } = useContext(AuthContext);

  const postData = async (formData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${apiPath.baseURL}${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (err) => {
      console.error("Mutation Error:", err);

      if (err?.code === "ERR_NETWORK") {
        ShowToast("Network error, please check your internet.", Severty.ERROR);
      }
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        ShowToast("Session expired, please login again.", Severty.ERROR);
        logout();
      }
      if (err?.response?.data?.message === "jwt expired") {
        ShowToast("Session expired! Please login again.", Severty.ERROR);
        logout();
      }
      if (err?.response?.data?.message === "Un-Authorized User") {
        ShowToast("Unauthorized access detected!", Severty.ERROR);
        logout();
      }

      if (onError) {
        onError(err.response?.data || err);
      }
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useRequest;
