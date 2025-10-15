import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";

const ViewAllOccasion = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "occasionData",
    endpoint: `${apiPath.getOccasionData}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <Main>
      <div className="bg-black min-h-screen text-white px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Dil Se Har Lamha Ke Liye</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {list?.map((item, index) => (
            <div key={item?._id} className="bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer hover:bg-zinc-800 transition-all duration-300">
              <img src={item?.image ?? Prouser} alt={item?.name} className="object-cover w-full h-40 md:h-48" />

              {/* Play button */}
              <div className="absolute right-3 bottom-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-green-500 p-3 rounded-full shadow-lg" onClick={() => navigate(`/occasion/details/${item?.name}/${item?._id}`)}>
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate text-white">{item?.name}</h3>
                <p className="text-sm text-gray-400 mt-1 truncate">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export default ViewAllOccasion;
