import { useNavigate } from "react-router";
import { ViewActionIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";

export const PoetSlider = ({ title }) => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const navigate = useNavigate();
  const authorSliderSettings = {
    dots: false,
    infinite: list?.length > 5,
    speed: 500,
    slidesToShow: 5,
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
  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "poetData",
    endpoint: `${apiPath.getPoetData}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);
  return (
    <>
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="text-sm text-blue-500 hover:underline" onClick={() => navigate("/poets")}>
            Show all
          </button>
        </div>

        <Slider {...authorSliderSettings}>
          {list?.map((item, index) => (
            <div key={index} className="px-2 hover:bg-zinc-800">
              <div className="flex flex-col items-center group ">
                <div className="relative w-36 h-36 bg-zinc-800 rounded-full overflow-hidden transition-all duration-300 group-hover:bg-zinc-700 ">
                  <img src={item?.image ?? Prouser} alt={item?.name} className="rounded-full w-full h-full object-cover transition-all duration-300 group-hover:brightness-75 z-0" />
                  <div
                    className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-1"
                    onClick={() => navigate(`/poets/details/${item?.name}/${item?._id}`)}
                  >
                    <ViewActionIcon />
                  </div>
                </div>
                <p className="text-center text-white mt-2 text-sm font-semibold">{item?.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export const SubCategorySlider = ({ data, title }) => {
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
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="text-sm text-blue-500 hover:underline" onClick={() => navigate(`/sub-category/details`)}>
            Show all
          </button>
        </div>

        <Slider {...settings}>
          {data?.map((card, index) => (
            <div key={index} className="px-2">
              <div className="relative group bg-zinc-800 rounded-2xl p-4 shadow-md hover:bg-zinc-700 transition-all duration-300 h-full">
                {/* Image container */}
                <div className="relative w-full h-40 overflow-hidden rounded-xl">
                  <img src={card?.image} alt={card?.name} className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:brightness-75" />

                  {/* Play Button (bottom right side) */}
                  <div
                    className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => navigate(`/sub-category/details/${card?.name}/${card._id}`)}
                  >
                    <ViewActionIcon />
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-4">
                  <p className="text-lg font-semibold truncate">{card?.name}</p>
                  <p className="text-sm text-zinc-300 truncate">{card?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export const OccasionSlider = ({ title }) => {
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
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [list, setList] = useState([]);

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "getOccasionData",
    endpoint: `${apiPath.getOccasionData}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);
  return (
    <>
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="text-sm text-blue-500 hover:underline" onClick={() => navigate("/occasion")}>
            Show all
          </button>
        </div>

        <Slider {...settings}>
          {list?.map((card, index) => (
            <div key={index} className="px-2">
              <div className="relative group bg-zinc-800 rounded-2xl p-4 shadow-md hover:bg-zinc-700 transition-all duration-300 h-full">
                {/* Image container */}
                <div className="relative w-full h-40 overflow-hidden rounded-xl">
                  <img src={card?.image} alt={card?.name} className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:brightness-75" />

                  <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => navigate(`/occasion/details/${card?.name}/${card._id}`)}>
                    <ViewActionIcon />
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-4">
                  <p className="text-lg font-semibold truncate">{card?.name}</p>
                  <p className="text-sm text-zinc-300 truncate">{card?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
