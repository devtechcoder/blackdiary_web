import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";

const AboutUs = () => {
  const [list, setList] = useState({});

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "about-us",
    endpoint: `${apiPath.common.getCms}/about-us`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data ?? {});
    }
  }, [data]);
  return (
    <>
      <Helmet>
        <title>About Us - Black Diary</title>
        <meta name="description" content="Learn about the story, mission, and vision of Black Diary. A platform dedicated to poets, writers, and lovers of words." />
      </Helmet>

      <PublicLayout>
        <div className="bg-white text-gray-800 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Content Sections */}
            <div className="space-y-10">
              <p dangerouslySetInnerHTML={{ __html: list?.description || "" }}></p>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default AboutUs;
