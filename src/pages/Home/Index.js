import React, { useState, useEffect, useRef } from "react";
import Main from "../../components/layout/Main";
import { FaHeart, FaComment, FaShareAlt, FaCopy } from "react-icons/fa";
import Slider from "react-slick";
import { useAppContext } from "../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Prouser from "../../assets/images/user.png";
import apiPath from "../../constants/apiPath";
// import { useGetApi } from "../../hooks/useGetApi";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import { FormattedBgColor } from "../../constants/Constants";
import { LikeShareActionIcon, ViewActionIcon } from "../../components/ButtonField";
import { OccasionSlider, PoetSlider, SubCategorySlider } from "../Common/Slider";
import { ViewSliderDairy } from "../Common/Section";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
import Loader from "../../components/Loader";

function LandingIndex() {
  const { categories } = useAppContext();
  const [subCategories, setSubCategories] = useState([]);
  const [homeData, setHomeData] = useState({});
  const navigate = useNavigate();

  const {
    data: subCategoriesData,
    isLoading: subCategoryLoading,
    isError: subCategoryIsError,
    error: subCategoryError,
    refetch: subCategoryRefetch,
  } = useGetApi({
    queryKey: "subCategories",
    endpoint: apiPath.common.subCategories,
  });

  useEffect(() => {
    if (subCategoriesData?.status && Array.isArray(subCategoriesData?.data)) {
      setSubCategories(subCategoriesData?.data ?? []);
    }
  }, [subCategoriesData]);

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "homeData",
    endpoint: apiPath.homeData,
  });

  useEffect(() => {
    console.log(data?.data?.topPoets, "datadatadata");
    setHomeData(data?.data ?? []);

    if (data?.status && Array.isArray(data?.data)) {
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
      <>
        {" "}
        <Helmet>
          {/* 🔹 Primary Meta Tags */}
          <title>{SEO.home.primary.title}</title>
          <meta name="description" content={SEO.home.primary.description} />
          <meta name="keywords" content={SEO.home.primary.keywords} />

          {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
          <meta property="og:title" content={SEO.home.openGraph.title} />
          <meta property="og:description" content={SEO.home.openGraph.description} />
          <meta property="og:image" content={SEO.home.openGraph.image} />
          <meta property="og:url" content={SEO.home.openGraph.url} />
          <meta property="og:type" content={SEO.home.openGraph.type} />
          <meta property="og:site_name" content={SEO.home.openGraph.site_name} />

          {/* 🔹 Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={SEO.home.twitter.title} />
          <meta name="twitter:description" content={SEO.home.twitter.description} />
          <meta name="twitter:image" content={SEO.home.twitter.image} />
          <meta name="twitter:url" content={SEO.home.twitter.url} />
          <meta name="twitter:type" content={SEO.home.twitter.type} />
          <meta name="twitter:site_name" content={SEO.home.twitter.site_name} />

          {/* 🔹 Canonical & Language Tags */}
          <link rel="canonical" href={SEO.common.url} />
          <meta name="robots" content={SEO.common.robots} />
          <meta name="language" content={SEO.common.language} />
          <meta name="author" content={SEO.common.author} />
        </Helmet>
        <div className="flex flex-col gap-6 p-2 sm:p-4 text-white">
          {/* Top Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              key={"All"}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 hover:bg-zinc-600 bg-green-500 text-black hover:bg-zinc-600 hover:text-white`}
              onClick={() => navigate(`/sub-category/details`)}
            >
              All
            </button>
            {categories?.length
              ? categories?.map((item) => (
                  <button key={item?.value} className="px-4 py-2 bg-zinc-700 rounded-full text-sm hover:bg-zinc-600" onClick={() => navigate(`/sub-category/details?category=${item?.value}`)}>
                    {item?.name}
                  </button>
                ))
              : ""}
          </div>
          {/* Quick Access Section */}
          {/* conononsdfsdf */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {subCategories?.length
              ? subCategories?.map((item, idx) => (
                  <>
                    <div
                      className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors duration-300 hover:bg-zinc-700 ${
                        FormattedBgColor[item.bg_color] || "bg-zinc-800"
                      } w-64 flex-shrink-0`}
                      onClick={() => navigate(`/sub-category/details/${item?.name}/${item._id}`)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded overflow-hidden">
                        <img src={item?.image} alt="sub category" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-sm flex-grow"> {item?.name}</span>
                    </div>
                  </>
                ))
              : "No Sub Categories"}
          </div>
          {/* Today's biggest hits Section Section */}
          <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Today's biggest hits"} type={"top_hits"} />

          {/* Popular albums */}
          <SubCategorySlider data={homeData?.subCategories ?? []} title={"Popular albums"} />

          {/* Popular Artists Section */}
          <PoetSlider data={homeData?.topPoets ?? []} title={"Shayaron Ki Mehfil"} />

          {/* SHER FOR OCCASION */}
          <OccasionSlider data={homeData?.occasions ?? []} title={"Special Moments Shayari"} />

          {/* Made For Albums featuring diary you like */}
          <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Albums featuring diary you like"} type={"liked"} />

          {/* Made For Recently played */}
          <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Trending Diaries"} type={"recently_viewed"} />

          {/* topDiary */}

          <TopDiarySection />
        </div>
      </>
    </Main>
  );
}

const TopDiarySection = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "TopDiarySection",
    endpoint: `${apiPath.getHomeTopDiary}?page=${pagination ? pagination.current : 1}&pageSize=${pagination ? pagination.pageSize : 10}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className="mt-6 px-0 sm:px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Diaries</h2>
          <button className="text-sm text-blue-500 hover:underline" onClick={() => navigate(`/sub-category/details`)}>
            Show all
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-zinc-900 pr-2">
          <div className="space-y-4 p-1">
            {list?.map((item, index) => (
              <div key={item._id} className="bg-zinc-800 text-white rounded-2xl p-5 shadow-md">
                <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: item?.content }} />
                <LikeShareActionIcon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingIndex;
