"use client";

import React, { useEffect, useState } from "react";
import PublicLayout from "../../components/layout/publicLayout";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const [list, setList] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["privacy_policy"].includes(item.type)));

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setShouldFetch(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const { response: data, loading } = useRequest(`${apiPath.common.getCms}/privacy-policy`, {
    skip: !shouldFetch,
  });

  useEffect(() => {
    if (data?.status) {
      setList(data?.data ?? {});
    }
  }, [data]);

  return (
    <>
      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{headingData?.title || "Privacy Policy"}</h1>
              <p className="text-lg text-gray-600">{headingData?.sub_title || ""}</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 animate-pulse">
                    <div className="h-4 w-full rounded bg-gray-200 mb-3" />
                    <div className="h-4 w-11/12 rounded bg-gray-200 mb-3" />
                    <div className="h-4 w-10/12 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: list?.description || "" }} />
            )}
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default PrivacyPolicy;
