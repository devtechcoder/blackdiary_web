import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import Loader from "../../components/Loader";
import { FormattedBgColor } from "../../constants/Constants";

const ViewAllSubCategory = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "ViewAllSubCategory",
    endpoint: `${apiPath.listSubCategory}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  if (isError) return <p>Error: {error.message}</p>;
  return (
    <Main>
      <div className="bg-black min-h-screen text-white px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Browse all</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {list?.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-lg overflow-hidden cursor-pointer group p-4 h-40 ${FormattedBgColor[item.bg_color] || "bg-gray-600"} hover:scale-105 transition-transform duration-300`}
              onClick={() => navigate(`/sub-category/details/${item?.name}/${item._id}`)}
            >
              {/* Text at top-left */}
              <h3 className="text-lg font-bold text-white z-10 relative">{item.name}</h3>

              {/* Image at full height & rotated, bottom-right pinned */}
              <img src={item.image} alt={item.name} className="absolute bottom-0 right-0 w-[80px] h-[80px] rotate-[25deg] shadow-xl object-cover" />
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};

export default ViewAllSubCategory;
