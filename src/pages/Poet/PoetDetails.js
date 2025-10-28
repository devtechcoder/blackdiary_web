import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
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
const PoetDetails = () => {
  const { categories } = useAppContext();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("About");
  const [poetData, setPoetData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const { subCategories } = useAppContext();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const menuRef = useRef();

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "poetDetails",
    endpoint: `${apiPath.getPoetDetails}/${id}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setPoetData(data?.data ?? []);
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
        <title>{SEO.PoetDetailsPage.primary.title}</title>
        <meta name="description" content={SEO.PoetDetailsPage.primary.description} />
        <meta name="keywords" content={SEO.PoetDetailsPage.primary.keywords} />

        {/* 🔹 Open Graph (for Facebook, WhatsApp, etc.) */}
        <meta property="og:title" content={SEO.PoetDetailsPage.openGraph.title} />
        <meta property="og:description" content={SEO.PoetDetailsPage.openGraph.description} />
        <meta property="og:image" content={SEO.PoetDetailsPage.openGraph.image} />
        <meta property="og:url" content={SEO.PoetDetailsPage.openGraph.url} />
        <meta property="og:type" content={SEO.PoetDetailsPage.openGraph.type} />
        <meta property="og:site_name" content={SEO.PoetDetailsPage.openGraph.site_name} />

        {/* 🔹 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.PoetDetailsPage.twitter.title} />
        <meta name="twitter:description" content={SEO.PoetDetailsPage.twitter.description} />
        <meta name="twitter:image" content={SEO.PoetDetailsPage.twitter.image} />
        <meta name="twitter:url" content={SEO.PoetDetailsPage.twitter.url} />
        <meta name="twitter:type" content={SEO.PoetDetailsPage.twitter.type} />
        <meta name="twitter:site_name" content={SEO.PoetDetailsPage.twitter.site_name} />

        {/* 🔹 Canonical & Language Tags */}
        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>
      <Main>
        <div className="bg-black min-h-screen text-white">
          {/* Top Profile Section */}
          {/* Top Profile Section */}
          <div className="flex flex-col md:flex-row items-start md:items-start p-6 md:p-12 bg-gradient-to-r from-indigo-700 via-purple-800 to-black">
            {/* Left: Image */}
            <div className="w-40 h-40 md:w-60 md:h-60 rounded-lg overflow-hidden shadow-lg">
              <img src="https://rekhta.pc.cdn.bitgravity.com/Images/Cms/T20/couplets-of-amjad-islam-amjad_Medium.png" alt="Banner Image" className="object-cover w-full h-full" />
            </div>

            {/* Right: Text */}
            <div className="mt-4 md:mt-0 md:ml-8 flex flex-col justify-start items-center md:items-start text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white">{poetData?.name ?? "Poet"}</h1>
              <p className="text-sm text-gray-300 mt-2 flex items-center">📅 1940 &nbsp; 📍 Bareilly, India</p>
              <p className="text-gray-400 text-sm mt-1 max-w-md">Popular poet having vast mass following.</p>
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
            <ViewDiary selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} pageData={poetData} pageType="poet" />
          ) : (
            <AboutSection data={poetData} />
          )}

          {/* More Author */}
          <div className="mt-6 px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">More Artists</h2>
              <button className="text-sm text-blue-500 hover:underline">Show all</button>
            </div>

            <Slider {...settings}>
              {shayariCards.map((card, index) => (
                <div key={index} className="px-2">
                  <div className="bg-zinc-800 rounded-2xl p-4 shadow-md hover:bg-zinc-700 transition-all duration-300 h-full">
                    <img src={card.image} alt={card.title} className="rounded-xl h-40 w-full object-cover mb-4" />
                    <p className="text-lg font-semibold mb-1">{card.title}</p>
                    <p className="text-sm text-zinc-300">{card.content}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Main>
    </>
  );
};

const AboutSection = ({ data }) => {
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
        <img src={data.image} alt={data.name} className="w-72 h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />

        {/* Right - Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-2">{data.name}</h1>
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

export default PoetDetails;
