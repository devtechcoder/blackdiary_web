import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { Spin } from "antd";
import { useNavigate } from "react-router";
import AppImage from "../../components/AppImage";

const gradients = [
  "bg-gradient-to-br from-purple-900 to-indigo-900",
  "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
  "bg-gradient-to-br from-red-900 to-rose-900",
  "bg-gradient-to-br from-cyan-800 to-blue-900",
  "bg-gradient-to-br from-emerald-800 to-green-900",
];
const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

const FeedGrid = ({ userId, type }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();

  const endpoint = type === "shayari" ? apiPath.getShayari : apiPath.getPost;

  const { data, isFetching } = useGetApi({
    queryKey: [`user-feed`, userId, type, pagination.current],
    endpoint: `${endpoint}?page=${pagination.current}&pageSize=${pagination.pageSize}&author=${userId}`,
    enabled: hasMore && !!userId,
  });

  useEffect(() => {
    // When the tab (type) or user changes, reset the state
    setItems([]);
    setPagination({ current: 1, pageSize: 12 });
    setHasMore(true);
  }, [type, userId]);

  useEffect(() => {
    if (data?.status) {
      // Ensure we only add new items to prevent duplicates
      setItems((prevItems) => {
        const newItems = data.data.docs.filter((doc) => !prevItems.some((prevItem) => prevItem._id === doc._id));
        return [...prevItems, ...newItems];
      });
      setHasMore(data.data.hasNextPage);
    }
  }, [data]); // Keep dependency on `data`

  const lastItemElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  if (!isFetching && items.length === 0) {
    return <div className="col-span-3 text-center text-gray-500 py-10">No {type}s yet.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
        {items.map((item, index) => (
          <div
            ref={items.length === index + 1 ? lastItemElementRef : null}
            key={item._id}
            className="relative aspect-square cursor-pointer group"
            onClick={() => navigate(`/feed?type=${type}&id=${item._id}`)}
          >
            {type === "post" && item.image ? (
              <AppImage src={apiPath.assetURL + item.image} alt="Post" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover bg-gray-900" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center p-2 text-center text-white text-xs md:text-sm ${getRandomGradient()}`}>
                <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            )}
          </div>
        ))}
      </div>
      {isFetching && (
        <div className="col-span-3 text-center py-6">
          <Spin />
        </div>
      )}
    </>
  );
};

const MyFeed = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("shayari");

  return (
    <>
      <div className="border-t border-gray-700 mt-8 flex justify-center sm:justify-around gap-8 text-sm font-medium text-gray-400">
        <button onClick={() => setActiveTab("shayari")} className={`pt-4 -mt-px ${activeTab === "shayari" ? "text-white border-t border-white" : "hover:text-white"}`}>
          SHAYARI
        </button>
        <button onClick={() => setActiveTab("post")} className={`pt-4 -mt-px ${activeTab === "post" ? "text-white border-t border-white" : "hover:text-white"}`}>
          POSTS
        </button>
      </div>

      {activeTab === "shayari" && <FeedGrid userId={userId} type="shayari" />}
      {activeTab === "post" && <FeedGrid userId={userId} type="post" />}
    </>
  );
};

export default MyFeed;
