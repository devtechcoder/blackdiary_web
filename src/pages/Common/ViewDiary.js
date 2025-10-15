import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { FaComment, FaCopy, FaHeart, FaShareAlt } from "react-icons/fa";
import Slider from "react-slick";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../context/AppContext";
import defaultNoData from "../../assets/images/default/default-no-data.png";
import Loader from "../../components/Loader";
import { ViewListDiary } from "./Section";

const ViewDiary = ({ selectedCategory, selectedSubCategory, pageData, pageType = "subCategory" }) => {
  const { categories } = useAppContext();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: pageType,
    endpoint: `${apiPath.getDiary}?category=${selectedCategory ?? ""}&sub_category_id=${selectedSubCategory ?? ""}${pageType === "occasion" ? `&occasion_id=${pageData?._id}` : ""}&page=${
      pagination ? pagination.current : 1
    }&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
      setPagination((prev) => ({ ...prev, total: data?.data?.totalDocs }));
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      {list?.length ? <h2 className="text-2xl font-bold mb-6 text-white">{`Top ${pagination?.total ?? 0} ${selectedCategory ?? ""} of ${pageData?.name ?? ""}`}</h2> : ""}
      <div className="space-y-8">
        {list?.length ? (
          <ViewListDiary list={list} />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center w-full h-72">
              <div className="w-40 h-40 flex justify-center items-center mb-4">
                <img src={defaultNoData} alt="No Data" className="w-full h-full object-contain" />
              </div>
              <p className="text-xl text-[#1DB954]">No Data Available</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDiary;
