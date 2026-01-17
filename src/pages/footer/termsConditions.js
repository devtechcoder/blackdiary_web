import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";

const TermsAndConditions = () => {
  const [list, setList] = useState({});

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "terms-and-conditions",
    endpoint: `${apiPath.common.getCms}/terms-and-conditions`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data ?? {});
    }
  }, [data]);
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Black Diary</title>
        <meta name="description" content="Read the Terms and Conditions for using the Black Diary application. This governs your rights and responsibilities as a user." />
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

export default TermsAndConditions;
