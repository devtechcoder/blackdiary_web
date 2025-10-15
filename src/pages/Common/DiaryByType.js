import React, { useEffect, useState, useRef, useCallback } from "react";
import Main from "../../components/layout/Main";
import { FaComment, FaCopy, FaHeart, FaShareAlt } from "react-icons/fa";
import Slider from "react-slick";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";
import { LikeShareActionIcon } from "../../components/ButtonField";
import { BannerSection, ViewListDiary } from "./Section";
import { PoetSlider } from "./Slider";

const shayariCards = [
  {
    title: "Heartfelt Shayari",
    content: "Tere bina jee na paayenge hum...",
    image: "https://i.scdn.co/image/ab67616d00001e02373b21b6dfdb6cd71e03101f",
  },
  {
    title: "Romantic Lines",
    content: "Mohabbat me har lamha intezaar hota hai...",
    image: "https://i.scdn.co/image/ab67616d00001e02614a583a490e23b29821b2ed",
  },
  {
    title: "Dard Bhari Shayari",
    content: "Tere jaane ke baad tanha ho gaye hain hum...",
    image: "https://i.scdn.co/image/ab67616d00001e02675b3f7dea80153c73581e5e",
  },
  {
    title: "Yaadon Ki Shayari",
    content: "Har yaad teri dil ko chhoo jaati hai...",
    image: "https://i.scdn.co/image/ab67616d00001e02699cce11792075219c61bb2f",
  },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
  ],
};
const DiaryByType = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const { type } = useParams();
  const listType = type;
  const menuRef = useRef();

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "setList",
    endpoint: `${apiPath.getDiaryByType}/${listType ? listType : ""}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
    enabled: listType ? true : false,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (listType) refetch();
  }, [listType]);

  if (isLoading)
    return (
      <Main>
        <Loader />
      </Main>
    );
  if (isError) return <p>Error: {error.message}</p>;

  const handleListTypeTitle = (listType) => {
    return listType == "top_hits" ? "Today's biggest hits" : listType == "liked" ? "Albums featuring diary you like" : "Recently viewed";
  };

  return (
    <Main>
      <div className="bg-black min-h-screen text-white">
        {/* Top Profile Section */}
        <div className="mt-6 px-4">
          {" "}
          <BannerSection />
        </div>

        <div className="relative px-6 mt-6 border-b border-gray-700 pb-2 mb-6">
          <h3 className="text-2xl font-semibold text-white flex space-x-6 overflow-x-auto pr-12">{handleListTypeTitle(listType)}</h3>
        </div>

        <ViewListDiary list={list} />

        {/* More Author */}
        <div className="mt-6 px-4">
          <PoetSlider title={"More Artists"} />
        </div>
      </div>
    </Main>
  );
};

export default DiaryByType;
