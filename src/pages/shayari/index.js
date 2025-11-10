import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Avatar, Input, Button, Spin } from "antd";
import { HeartOutlined, HeartFilled, MessageOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import dayjs from "dayjs";
import Prouser from "../../assets/images/user.png";

// Utility to get a random gradient background
const gradients = [
  "bg-gradient-to-br from-purple-900 to-indigo-900",
  "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
  "bg-gradient-to-br from-red-900 to-rose-900",
  "bg-gradient-to-br from-cyan-800 to-blue-900",
  "bg-gradient-to-br from-emerald-800 to-green-900",
];
const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

// Utility to strip HTML tags for plain text display
const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const ShayariCard = ({ shayari }) => {
  // In a real app, isLiked would come from API or user context
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(shayari.total_likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    // Here you would also call an API to toggle the like status on the server
  };

  return (
    <Card className="w-full max-w-lg bg-[#121212] border border-gray-800 rounded-lg mb-6" bodyStyle={{ padding: 0 }}>
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar src={shayari.author?.image || Prouser} />
          <span className="text-white font-semibold">{shayari.author?.user_name || "Unknown User"}</span>
        </div>
        <MoreOutlined className="text-white text-xl cursor-pointer" />
      </div>

      {/* Shayari Text Content */}
      <div className={`flex items-center justify-center text-center p-8 min-h-[300px] ${getRandomGradient()}`}>
        <p
          className="text-xl md:text-2xl font-medium leading-relaxed whitespace-pre-line text-white"
          style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
          dangerouslySetInnerHTML={{ __html: shayari?.content }}
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center text-white text-2xl">
          <div className="flex gap-4">
            {isLiked ? (
              <HeartFilled className="text-red-500 cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={handleLike} />
            ) : (
              <HeartOutlined className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" onClick={handleLike} />
            )}
            <MessageOutlined className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" />
            <SendOutlined className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" />
          </div>
        </div>

        {/* Likes and Caption */}
        <div className="text-white mt-2">
          <p className="font-semibold">{likes?.toLocaleString()} likes</p>
          <p>
            <span className="font-semibold mr-2">{shayari.author?.user_name || "Unknown User"}</span>
            <span className="text-gray-300">{stripHtml(shayari.content).substring(0, 50)}...</span>
          </p>
          <p className="text-gray-500 text-xs mt-1 uppercase">{dayjs(shayari.created_at).fromNow()}</p>
        </div>

        {/* Comment Input */}
        <div className="mt-3 border-t border-gray-800 pt-3">
          <Input
            placeholder="Add a comment..."
            className="bg-transparent border-none text-white placeholder-gray-500 focus:ring-0"
            suffix={<span className="text-green-500 font-semibold cursor-pointer">Post</span>}
          />
        </div>
      </div>
    </Card>
  );
};

const ShayariPage = () => {
  const [shayaris, setShayaris] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data, isFetching, isError, error } = useGetApi({
    queryKey: ["shayari", pagination.current],
    endpoint: `${apiPath.getShayari}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: hasMore, // Only fetch if there's more data
  });
  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data.data.docs;
      // Append new data to the existing list
      setShayaris((prev) => [...prev, ...newDocs]);
      setPagination((prev) => ({
        ...prev,
        total: data.data.totalDocs,
      }));
      // Check if there are more pages to load
      if (data.data.page >= data.data.totalPages) {
        setHasMore(false);
      }
    }
  }, [data, isError]);

  const lastShayariElementRef = useCallback(
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

  return (
    <Main>
      <div className="flex justify-center w-full bg-black text-white">
        <div className="flex flex-col items-center w-full px-4">
          {shayaris.map((shayari, index) => {
            if (shayaris.length === index + 1) {
              return (
                <div ref={lastShayariElementRef} key={shayari._id}>
                  <ShayariCard shayari={shayari} />
                </div>
              );
            } else {
              return <ShayariCard key={shayari._id} shayari={shayari} />;
            }
          })}

          {isFetching && <Spin size="large" className="my-4" />}

          {!hasMore && <p className="text-gray-500 my-4">You've reached the end!</p>}
        </div>
      </div>
    </Main>
  );
};

export default ShayariPage;
