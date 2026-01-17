import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";

const PrivacyPolicy = () => {
  const [list, setList] = useState({});

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "privacy-policy",
    endpoint: `${apiPath.common.getCms}/privacy-policy`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data ?? {});
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Black Diary</title>
        <meta name="description" content="Read the Privacy Policy for Black Diary to understand how we collect, use, and protect your personal information and data." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <p dangerouslySetInnerHTML={{ __html: list?.description || "" }} />
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default PrivacyPolicy;
