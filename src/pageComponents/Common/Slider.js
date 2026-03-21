import { useNavigate } from "react-router";
import { ViewActionIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import AppImage from "../../components/AppImage";

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
      <div className="mt-2 px-1 sm:px-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="poetic-heading text-lg sm:text-2xl font-semibold text-[#F5F5F5]">{title}</h2>
          <button className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#FFD700] hover:underline" onClick={() => navigate("/poets")}>
            Show all
          </button>
        </div>

        <Slider {...authorSliderSettings} className="bd-home-slider">
          {list?.map((item, index) => (
            <div key={index} className="px-2">
              <div className="flex flex-col items-center group ">
                <div className="relative w-36 h-36 bg-[#151515] rounded-full overflow-hidden border border-[#2a2416] shadow-[inset_0_0_0_1px_rgba(255,215,0,0.04),0_10px_22px_rgba(0,0,0,0.32)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#3b3220] group-hover:shadow-[inset_0_0_0_1px_rgba(255,215,0,0.06),0_0_18px_rgba(212,175,55,0.12)]">
                  <AppImage src={item?.image ?? Prouser} alt={item?.name} fill sizes="144px" className="rounded-full object-cover transition-all duration-300 group-hover:brightness-75 z-0" />
                  <div
                    className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-1 cursor-pointer"
                    onClick={() => navigate(`/poets/details/${item?.name}/${item?._id}`)}
                  >
                    <ViewActionIcon />
                  </div>
                </div>
                <p className="text-center text-[#F5F5F5] mt-2 text-sm font-semibold">{item?.name}</p>
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
      <div className="mt-2 px-1 sm:px-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="poetic-heading text-lg sm:text-2xl font-semibold text-[#F5F5F5]">{title}</h2>
          <button className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#FFD700] hover:underline" onClick={() => navigate(`/sub-categories`)}>
            Show all
          </button>
        </div>

        <Slider {...settings} className="bd-home-slider">
          {data?.map((card, index) => (
            <div key={index} className="px-2">
              <div
                className="group relative h-full cursor-pointer overflow-hidden rounded-xl border bg-[#1A1A1A] p-4 shadow-[0_0_20px_rgba(255,215,0,0.08)] transition-shadow duration-500 hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]"
                style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}
                onClick={() => navigate(`/sub-category/details/${card?.name}/${card._id}`)}
              >
                {/* Image container */}
                <div className="relative h-32 w-full overflow-hidden rounded-[14px]">
                  <AppImage
                    src={card?.image}
                    alt={card?.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="rounded-[14px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />

                  {/* Play Button (bottom right side) */}
                  <div
                    className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ViewActionIcon />
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-2">
                  <p className="truncate text-lg font-semibold leading-tight text-[#F5F5F5]">{card?.name}</p>
                  {card?.description ? <p className="mt-1 truncate text-sm leading-snug text-[#9CA3AF]">{card?.description}</p> : null}
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
      <div className="mt-2 px-1 sm:px-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="poetic-heading text-lg sm:text-2xl font-semibold text-[#F5F5F5]">{title}</h2>
          <button className="text-xs sm:text-sm text-[#D4AF37] hover:text-[#FFD700] hover:underline" onClick={() => navigate("/occasion")}>
            Show all
          </button>
        </div>

        <Slider {...settings} className="bd-home-slider">
          {list?.map((card, index) => (
            <div key={index} className="px-2">
              <div className="relative group bg-[#151515] rounded-[18px] p-4 border border-[#2a2416] shadow-[inset_0_0_0_1px_rgba(255,215,0,0.04),0_12px_26px_rgba(0,0,0,0.34)] transition-all duration-300 h-full hover:-translate-y-[4px] hover:border-[#3b3220] hover:shadow-[inset_0_0_0_1px_rgba(255,215,0,0.06),0_0_20px_rgba(212,175,55,0.12)]">
                {/* Image container */}
                <div className="relative w-full h-40 overflow-hidden rounded-xl">
                  <AppImage src={card?.image} alt={card?.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="rounded-xl object-cover transition-transform duration-300 group-hover:brightness-75" />

                  <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" onClick={() => navigate(`/occasion/details/${card?.name}/${card._id}`)}>
                    <ViewActionIcon />
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-4">
                  <p className="text-lg font-semibold truncate text-[#F5F5F5]">{card?.name}</p>
                  <p className="text-sm text-[#9CA3AF] truncate">{card?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
