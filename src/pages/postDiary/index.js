import React, { useState, useEffect } from "react";
import { Button, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import Main from "../../components/layout/Main";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { usePostApi, useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { ShowToast, Severty } from "../../helper/toast";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
const WriteShayari = React.lazy(() => import("./writeShayari"));

const PostDiaryPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      ShowToast("Please log in to create a diary.", Severty.WARNING);
    }
  }, [isLoggedIn, navigate]);

  return (
    <Main>
      <WriteShayari />
    </Main>
  );
};

export default PostDiaryPage;
