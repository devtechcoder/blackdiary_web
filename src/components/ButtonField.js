import { Col, Form, Input, Select, InputNumber, Checkbox } from "antd";
import PhoneInput from "react-phone-input-2";
import { useAppContext } from "../context/AppContext";
import lang from "../helper/langHelper";
import { FaHeart, FaComment, FaShareAlt, FaCopy } from "react-icons/fa";
import { message, Modal } from "antd";
import useRequest from "../hooks/useRequest";
import { useState } from "react";
import apiPath from "../constants/apiPath";
import { Severty, ShowToast } from "../helper/toast";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { stripHtml } from "../helper/functions";
import CommentModal from "./CommentModal";

export const ViewActionIcon = () => {
  const { language } = useAppContext();
  return (
    <div className="bg-green-500 p-3 rounded-full shadow-lg">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="black" strokeWidth="6">
        <path d="M50 10 L90 90 H10 Z" />
        <path d="M50 10 V90" />
        <path d="M10 90 L50 60 L90 90" />
      </svg>
    </div>
  );
};

export const LikeShareActionIcon = ({ item }) => {
  const { language } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(item?.is_liked || false);
  const [totalLikes, setTotalLikes] = useState(item?.total_likes || 0);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const { request } = useRequest();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const onLike = (value) => {
    const payload = {
      diary_id: item?._id,
    };
    setLoading(true);
    request({
      url: `${apiPath.toggleLikes}?type=${type || "shayari"}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS);
          setIsLiked(!isLiked);
          setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  const handleShare = async (shareData) => {
    try {
      await navigator.share(shareData);
      console.log("MDN shared successfully");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-start sm:justify-start gap-4 sm:gap-6 text-zinc-400">
        <button className={`flex items-center gap-1 ${isLiked ? "text-green-400" : "hover:text-green-400 transition"}`} onClick={onLike} disabled={loading} loading={loading}>
          <FaHeart /> <span className="hidden sm:inline">Like</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-400 transition" onClick={() => setIsCommentModalVisible(true)}>
          <FaComment /> <span className="hidden sm:inline">Comment</span>
        </button>
        <button
          className="flex items-center gap-1 hover:text-green-400 transition"
          onClick={() => {
            const temp = document.createElement("div");
            temp.innerHTML = item?.content || "";
            const plainText = temp.textContent || temp.innerText || "";

            const title = encodeURIComponent("Black Diary – Shayari");
            const text = encodeURIComponent(`${plainText}\n\nRead this Shayari on Black Diary 💫`);
            const baseUrl = window.location.origin + "/sub-category/details";

            const shareUrl = `${baseUrl}?title=${title}&text=${text}`;

            const shareData = {
              url: shareUrl,
            };
            handleShare(shareData);
          }}
        >
          <FaShareAlt /> <span className="hidden sm:inline">Share</span>
        </button>

        <button
          className="flex items-center gap-1 hover:text-green-400 transition"
          onClick={() => {
            // Strip HTML using a dummy div
            const tempElement = document.createElement("div");
            tempElement.innerHTML = item?.content || "";
            const plainText = tempElement.textContent || tempElement.innerText || "";

            // Copy to clipboard
            navigator.clipboard.writeText(plainText);
            message.success("Copied to clipboard!");
          }}
        >
          <FaCopy /> <span className="hidden sm:inline">Copy</span>
        </button>
      </div>

      <div className="text-white mt-2">
        <p className="font-medium text-sm">{totalLikes} likes</p>
        <p className="text-sm">
          {!!item?.content && (
            <>
              <span className="font-medium mr-2">{item.author?.user_name || "Unknown User"}</span>
              <span className="text-gray-400">{item.content ? `${stripHtml(item.content).substring(0, 50)}...` : ""}</span>
            </>
          )}{" "}
        </p>
        <p className="text-gray-500 text-xs mt-1 uppercase">{dayjs(item?.created_at).fromNow()}</p>
      </div>

      <CommentModal postId={item?._id} visible={isCommentModalVisible} onClose={() => setIsCommentModalVisible(false)} />
    </div>
  );
};

export const FollowIcon = ({ userId, classname, hideButton = false, buttonName = "Follow", onActionComplete }) => {
  const { language } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(hideButton || true);
  const { request } = useRequest();

  const onFollow = (value) => {
    const payload = {
      following_id: userId,
    };
    setLoading(true);
    request({
      url: `${apiPath.toggleFollow}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          setShowButton(!showButton);
          ShowToast(data.message, Severty.SUCCESS);
          if (onActionComplete) {
            onActionComplete();
          }
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  return (
    <>
      {!!showButton && (
        <button
          className={classname ? classname : "bg-green-500 text-white font-semibold px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors duration-200"}
          onClick={onFollow}
          disabled={loading}
          loading={loading}
        >
          {buttonName}
        </button>
      )}
    </>
  );
};
