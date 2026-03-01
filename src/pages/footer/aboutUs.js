import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import apiPath from "../../constants/apiPath";
import { useRequest } from "../../hooks/useReduxRequest";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const [list, setList] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["about_us"].includes(item.type)));

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setShouldFetch(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const { response: data, loading } = useRequest(`${apiPath.common.getCms}/about-us`, {
    skip: !shouldFetch,
  });

  useEffect(() => {
    if (data?.status) {
      setList(data?.data ?? {});
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{headingData?.title || "About Us"} - Black Diary</title>
        <meta name="description" content="Learn about the story, mission, and vision of Black Diary. A platform dedicated to poets, writers, and lovers of words." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{headingData?.title || "About Us"}</h1>
              <p className="text-lg text-gray-600">{headingData?.sub_title || ""}</p>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-10">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 animate-pulse">
                    <div className="h-4 w-full rounded bg-gray-200 mb-3" />
                    <div className="h-4 w-11/12 rounded bg-gray-200 mb-3" />
                    <div className="h-4 w-10/12 rounded bg-gray-200" />
                  </div>
                ))
              ) : (
                <p dangerouslySetInnerHTML={{ __html: list?.description || "" }}></p>
              )}
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default AboutUs;
