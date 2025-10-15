// // hooks/useGetApi.js

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const BASE_URL = "http://localhost:7900/api";

// export const useGetApi = ({ queryKey, endpoint, enabled = true, params = {}, headers = {} }) => {
//   const fetchData = async () => {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(`${BASE_URL}${endpoint}`, {
//       params,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         ...headers,
//       },
//     });

//     return response.data;
//   };

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: [queryKey, params], // unique key with params
//     queryFn: fetchData,
//     enabled, // control whether to fetch or not
//     onError: (err) => {
//       console.error("Query Error:", err);

//       if (err?.code === "ERR_NETWORK") {
//         ShowToast("Network error, please check your internet.", "error");
//       }
//       if (err?.response?.status === 401 || err?.response?.status === 403) {
//         ShowToast("Session expired, please login again.", "error");
//         logout();
//       }
//       if (err?.response?.data?.message === "jwt expired") {
//         ShowToast("Session expired! Please login again.", "error");
//         logout();
//       }
//       if (err?.response?.data?.message === "Un-Authorized User") {
//         ShowToast("Unauthorized access detected!", "error");
//         logout();
//       }
//     },
//   });

//   return {
//     data,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   };
// };
