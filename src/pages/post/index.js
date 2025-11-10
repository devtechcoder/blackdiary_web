import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Avatar, Input, Spin } from "antd";
import { HeartOutlined, HeartFilled, MessageOutlined, SendOutlined, MoreOutlined, BookOutlined } from "@ant-design/icons";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import dayjs from "dayjs";
import Prouser from "../../assets/images/user.png";

const PostCard = ({ post }) => {
  // In a real app, isLiked would come from API or user context
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.total_likes);

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
          <Avatar src={post.author?.image || Prouser} />
          <span className="text-white font-semibold">{post.author?.user_name || "Unknown User"}</span>
        </div>
        <MoreOutlined className="text-white text-xl cursor-pointer" />
      </div>

      {/* Post Image */}
      {post.image && <img src={post.image} alt="Post" className="w-full h-auto object-cover bg-gray-900" />}

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
          <BookOutlined className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110" />
        </div>
        {/* Likes and Caption */}
        <div className="text-white mt-2">
          <p className="font-semibold">{likes?.toLocaleString()} likes</p>
          {post.content && (
            <p>
              <span className="font-semibold mr-2">{post.author?.user_name || "Unknown User"}</span>
              <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: post.content }} />
            </p>
          )}
          <p className="text-gray-500 text-xs mt-1 uppercase">{dayjs(post.created_at).fromNow()}</p>
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

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data, isFetching, isError, error } = useGetApi({
    queryKey: ["post", pagination.current],
    endpoint: `${apiPath.getPost}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: hasMore, // Only fetch if there's more data
  });

  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data.data.docs;
      setPosts((prev) => [...prev, ...newDocs]);
      setPagination((prev) => ({
        ...prev,
        total: data.data.totalDocs,
      }));
      if (data.data.page >= data.data.totalPages) {
        setHasMore(false);
      }
    }
  }, [data, isError]);

  const lastPostElementRef = useCallback(
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
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post._id} className="w-full max-w-lg">
                  <PostCard post={post} />
                </div>
              );
            } else {
              return <PostCard key={post._id} post={post} />;
            }
          })}

          {isFetching && <Spin size="large" className="my-4" />}

          {!hasMore && posts.length > 0 && <p className="text-gray-500 my-4">You've reached the end!</p>}

          {!isFetching && posts.length === 0 && <p className="text-gray-500 my-4">No posts to show.</p>}
        </div>
      </div>
    </Main>
  );
};

export default PostPage;
