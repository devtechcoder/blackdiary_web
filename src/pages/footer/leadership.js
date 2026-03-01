import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import { useSelector } from "react-redux";

const Leadership = () => {
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["leadership", "our_leadership", "user_leadership"].includes(item.type)));

  const { response: data, loading } = useRequest(`${apiPath.getLeadershipList}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`);

  useEffect(() => {
    if (data?.status) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>{headingData?.title || "Our Leadership"} - Black Diary</title>
        <meta name="description" content="Meet the team behind Black Diary. Our leaders are passionate about creating a space for creativity and expression." />
      </Helmet>

      {/* MAIN PAGE CONTAINER */}
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* PAGE HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">{headingData?.title || "Our Leadership"}</h1>
            <p className="text-gray-600 mt-2 text-lg">{headingData?.sub_title || "The passionate team dedicated to bringing poetry to the world."}</p>
          </div>

          {/* LEADERS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 animate-pulse">
                    <div className="w-36 h-36 rounded-full bg-gray-200 mx-auto mb-6" />
                    <div className="h-6 w-40 rounded bg-gray-200 mx-auto mb-3" />
                    <div className="h-4 w-28 rounded bg-gray-200 mx-auto mb-5" />
                    <div className="h-4 w-full rounded bg-gray-200 mb-2" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 mx-auto" />
                  </div>
                ))
              : !!list?.length &&
                list?.map((leader, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <img src={leader?.image || Prouser} alt={leader?.name} className="w-36 h-36 object-cover rounded-full shadow-sm mb-6" />

                    <h3 className="text-xl font-semibold text-gray-900">{leader?.name || ""}</h3>
                    <p className="text-indigo-600 font-medium mt-1">{leader?.designation || ""}</p>

                    <p className="text-gray-600 text-sm mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: leader?.description || "" }}></p>
                  </div>
                ))}
            {!loading && !list?.length && <div className="sm:col-span-2 lg:col-span-3 text-center text-gray-500">No leadership data available right now.</div>}
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Leadership;
