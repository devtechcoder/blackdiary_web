import React, { useCallback, useEffect, useRef, useState } from "react";
import Main from "../../components/layout/Main";
import { FaComment, FaCopy, FaHeart, FaShareAlt } from "react-icons/fa";
import Slider from "react-slick";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../context/AppContext";
import ViewDiary from "../Common/ViewDiary";
import Loader from "../../components/Loader";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { OccasionSlider, PoetSlider } from "../Common/Slider";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";

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

const OccasionDetails = () => {
  const { categories, subCategories } = useAppContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [occasionData, setOccasionData] = useState({});
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { id } = useParams();
  const menuRef = useRef();

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "occasionDetails",
    endpoint: `${apiPath.getOccasionDetails}/${id}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setOccasionData(data?.data ?? []);
    }
  }, [data]);

  const handler = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  // Use useEffect unconditionally at the top level
  useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [handler]);

  if (isLoading)
    return (
      <Main>
        <Loader />
      </Main>
    );
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        {/* 🔹 Primary Meta Tags */}
        <title>{SEO.occasionDetailsPage.primary.title}</title>
        <meta name="description" content={SEO.occasionDetailsPage.primary.description} />
        <meta name="keywords" content={SEO.occasionDetailsPage.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.occasionDetailsPage.openGraph.title} />
        <meta property="og:description" content={SEO.occasionDetailsPage.openGraph.description} />
        <meta property="og:image" content={SEO.occasionDetailsPage.openGraph.image} />
        <meta property="og:url" content={SEO.occasionDetailsPage.openGraph.url} />
        <meta property="og:type" content={SEO.occasionDetailsPage.openGraph.type} />
        <meta property="og:site_name" content={SEO.occasionDetailsPage.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.occasionDetailsPage.twitter.title} />
        <meta name="twitter:description" content={SEO.occasionDetailsPage.twitter.description} />
        <meta name="twitter:image" content={SEO.occasionDetailsPage.twitter.image} />
        <meta name="twitter:url" content={SEO.occasionDetailsPage.twitter.url} />
        <meta name="twitter:type" content={SEO.occasionDetailsPage.twitter.type} />
        <meta name="twitter:site_name" content={SEO.occasionDetailsPage.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>

      <Main>
        <div className="bg-black min-h-screen text-white">
          {/* Top Profile Section */}
          {/* New Spotify-Style Banner Section */}
          <div className="relative bg-gradient-to-b from-blue-700 to-black min-h-[400px] flex items-center p-8 md:p-16 text-white">
            {/* Left Side: Image */}
            <div className="w-40 h-40 md:w-60 md:h-60 rounded-lg overflow-hidden shadow-lg">
              <img src={occasionData?.image ?? Prouser} alt={occasionData?.name} className="object-cover w-full h-full hover:scale-105 transition-transform" />
            </div>

            {/* Right Side: Text */}
            <div className="ml-8 flex flex-col justify-center">
              <p className=" text-sm font-semibold mb-2">{occasionData?.type ?? "Festival"}</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{occasionData?.name ?? "Occasion"}</h1>
              <span>{occasionData?.description}</span>

              <div className="flex items-center gap-2 text-gray-300 text-sm">
                {/* <img
                src="https://rekhta.pc.cdn.bitgravity.com/Images/Cms/collectionSeries/Banner/EBC58E6A-3B42-452C-918C-DDE80D634F7D_occasions_web.jpg" // 👈 Artist image (optional)
                alt="Artist"
                className="w-6 h-6 rounded-full"
              /> */}
                <span>•</span>
                <span>2020</span>
                <span>•</span>
                <span>3:33</span>
                <span>•</span>
                <span>189,077,562 clicks</span>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="relative px-6 mt-6 border-b border-gray-700 pb-2">
            {/* Scrollable category buttons */}
            <div className="flex space-x-6 overflow-x-auto pr-12">
              <button
                key={"About"}
                onClick={() => {
                  setSelectedSubCategory();
                }}
                className={`uppercase text-sm tracking-widest text-gray-400 pb-2 border-b-2 border-transparent hover:text-green-400 hover:border-green-500 active:border-green-500 ${
                  selectedSubCategory === undefined ? "text-green-400 border-green-500" : ""
                }`}
              >
                About
              </button>
              {subCategories?.map((item) => (
                <button
                  key={item?._id}
                  onClick={() => {
                    setSelectedSubCategory(item?._id);
                  }}
                  className={`uppercase text-sm tracking-widest text-gray-400 pb-2 border-b-2 border-transparent hover:text-green-400 hover:border-green-500 active:border-green-500 ${
                    selectedSubCategory === item?._id ? "text-green-400 border-green-500" : ""
                  }`}
                >
                  {item?.name}
                </button>
              ))}
            </div>

            {/* Dropdown icon and menu outside scroll */}
            <div className="absolute right-6 top-2">
              <button onClick={() => setOpen(!open)} className="text-white hover:text-green-500 focus:outline-none">
                {open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>

              {open && (
                <div className={`absolute right-0 mt-2 w-48 bg-zinc-900 border border-gray-700 rounded-md shadow-lg z-50 ${selectedCategory === undefined ? "text-green-400 border-green-500" : ""}`}>
                  <button
                    key={"All"}
                    onClick={() => {
                      setSelectedCategory();
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white"
                  >
                    All
                  </button>

                  {categories?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCategory(item?.value);
                        setOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white  ${
                        selectedCategory === item?.value ? "text-green-400 border-green-500" : ""
                      }`}
                    >
                      {item?.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Shayari Section */}
          {selectedSubCategory !== undefined ? (
            <ViewDiary selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} pageData={occasionData} pageType="occasion" />
          ) : (
            <OccasionPremiumPage occasionData={occasionData} />
          )}
          {/* More Occasion */}
          <div className="mt-6 px-4">
            <OccasionSlider title={"Choose More Occasion"} />
          </div>
          {/* More Author */}
          <div className="mt-6 px-4">
            <PoetSlider title={"More Artists"} />
          </div>
        </div>
      </Main>
    </>
  );
};

const OccasionPremiumPage = ({ occasionData }) => {
  const occasion = {
    title: "New Year Celebration",
    tagline: "Welcoming the new year with joy, hope, and new beginnings.",
    image: "https://your-image-url.com/newyear.jpg",
    year: 2020,
    duration: "3:33",
    views: 189077562,
    description: `New Year is celebrated worldwide with great enthusiasm and joy. 
People welcome the upcoming year with parties, fireworks, and new hopes. 
It's a moment to reflect on past achievements and set fresh goals.`,
    highlights: ["Grand Fireworks at Midnight", "Making New Year Resolutions", "Celebrating with Friends and Family", "Special Shayari and Songs for New Year"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2b80] via-black to-black text-white px-6 py-12 flex flex-col items-center animate-slide-up">
      {/* Card */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl max-w-5xl w-full p-8 flex flex-col md:flex-row gap-8">
        {/* Left - Poster */}
        <img src={occasionData.image} alt={occasionData.name} className="w-72 h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />

        {/* Right - Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-2">{occasionData.name}</h1>
          <p className="text-lg italic text-gray-300 mb-6">"{occasion.tagline}"</p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
            <span>📅 {occasion.year}</span>
            <span>⏳ {occasion.duration}</span>
            <span>👀 {occasion.views.toLocaleString()}</span>
          </div>

          <p className="text-base leading-7 text-gray-300">{occasion.description}</p>

          {/* Highlights */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">🌟 Highlights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {occasion.highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccasionDetails;
