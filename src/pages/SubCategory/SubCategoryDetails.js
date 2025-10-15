import React, { useEffect, useState, useRef, useCallback } from "react";
import Main from "../../components/layout/Main";
import { FaComment, FaCopy, FaHeart, FaShareAlt } from "react-icons/fa";
import Slider from "react-slick";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../context/AppContext";
import ViewDiary from "../Common/ViewDiary";
import Loader from "../../components/Loader";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { BannerSection } from "../Common/Section";
import { PoetSlider } from "../Common/Slider";

const SubCategoryDetails = () => {
  const { categories } = useAppContext();
  const navigate = useNavigate();
  const [subCategoryDetails, setSubCategoryDetails] = useState({});
  const { id: subCategoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryId);
  const { subCategories } = useAppContext();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "subCategoryDetails",
    endpoint: `${apiPath.getSubCategoryDetails}/${subCategoryId}`,
    enabled: subCategoryId ? true : false,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setSubCategoryDetails(data?.data ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (subCategoryId) refetch();
  }, [subCategoryId]);

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
    <Main>
      <div className="bg-black min-h-screen text-white">
        {/* Top Profile Section */}
        <div className="mt-6 px-4">
          {" "}
          <BannerSection />
        </div>

        <div className="relative px-6 mt-6 border-b border-gray-700 pb-2">
          {/* Scrollable category buttons */}
          <div className="flex space-x-6 overflow-x-auto pr-12">
            <button
              key={"all"}
              onClick={() => {
                setSelectedSubCategory();
                navigate(`/sub-category/details`);
              }}
              className={`uppercase text-sm tracking-widest text-gray-400 pb-2 border-b-2 border-transparent hover:text-green-400 hover:border-green-500 active:border-green-500 ${
                selectedSubCategory === undefined ? "text-green-400 border-green-500" : ""
              }`}
            >
              All
            </button>
            {subCategories?.map((item) => (
              <button
                key={item?._id}
                onClick={() => {
                  setSelectedSubCategory(item?._id);
                  navigate(`/sub-category/details/${item?.name}/${item?._id}`);
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
        <ViewDiary selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} pageData={subCategoryDetails} />

        {/* More Author */}
        <div className="mt-6 px-4">
          <PoetSlider title={"More Artists"} />
        </div>
      </div>
    </Main>
  );
};

export default SubCategoryDetails;
