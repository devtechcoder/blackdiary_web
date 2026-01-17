import React, { useEffect, useState } from "react";
import leaderShipImage from "../../assets/images/dummy/leadership.jpeg";
import { Helmet } from "react-helmet-async";
import PublicLayout from "../../components/layout/publicLayout";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import Loader from "../../components/Loader";
import Loading from "../../components/Loading";

const Leadership = () => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "leadershipData",
    endpoint: `${apiPath.getLeadershipList}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Our Leadership - Black Diary</title>
        <meta name="description" content="Meet the team behind Black Diary. Our leaders are passionate about creating a space for creativity and expression." />
      </Helmet>

      {/* MAIN PAGE CONTAINER */}
      <PublicLayout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* PAGE HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900">Our Leadership</h1>
            <p className="text-gray-600 mt-2 text-lg">The passionate team dedicated to bringing poetry to the world.</p>
          </div>

          {/* LEADERS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {isLoading ? (
              <Loading />
            ) : (
              !!list?.length &&
              list?.map((leader, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <img src={leader?.image || Prouser} alt={leader?.name} className="w-36 h-36 object-cover rounded-full shadow-sm mb-6" />

                  <h3 className="text-xl font-semibold text-gray-900">{leader?.name || ""}</h3>
                  <p className="text-indigo-600 font-medium mt-1">{leader?.designation || ""}</p>

                  <p className="text-gray-600 text-sm mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: leader?.description || "" }}></p>
                </div>
              ))
            )}
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default Leadership;
