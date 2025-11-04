import { Col, Form, Input, Select, InputNumber, Checkbox } from "antd";
import PhoneInput from "react-phone-input-2";
import { useAppContext } from "../context/AppContext";
import lang from "../helper/langHelper";
import { FaHeart, FaComment, FaShareAlt, FaCopy } from "react-icons/fa";
import { message } from "antd";
import useRequest from "../hooks/useRequest";
import { useState } from "react";
import apiPath from "../constants/apiPath";
import { Severty, ShowToast } from "../helper/toast";

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
  const { request } = useRequest();

  const onLike = (value) => {
    console.log("Like---->", item);
    const payload = {
      diary_id: item?._id,
    };
    setLoading(true);
    request({
      url: `${apiPath.toggleLikes}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS);
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
    <div className="flex items-center justify-start sm:justify-start gap-4 sm:gap-6 text-zinc-400">
      <button className="flex items-center gap-1 hover:text-green-400 transition" onClick={onLike} disabled={loading} loading={loading}>
        <FaHeart /> <span className="hidden sm:inline">Like</span>
      </button>
      <button className="flex items-center gap-1 hover:text-green-400 transition">
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
  );
};
