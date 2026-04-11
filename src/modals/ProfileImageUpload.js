import { Button, Upload } from "antd";
import React, { useState, useEffect } from "react";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { ShowToast, Severty } from "../helper/toast";
import apiPath from "../constants/apiPath";
import useRequest from "../hooks/useRequest";
import ImgCrop from "antd-img-crop"; // <-- CROP SUPPORT
import { resolveAssetUrl } from "../helper/functions";

const ProfileImageUpload = ({ fileType, value, imageType, btnName, onChange, size = 10, isDimension = false, buttonClassName = "", ...props }) => {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(resolveAssetUrl(value, apiPath.assetURL));
  const { request } = useRequest();

  const handleImgChange = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    request({
      url: apiPath.common.imageUpload,
      method: "POST",
      data: formData,
      onSuccess: ({ data, status, message }) => {
        setLoading(false);
        if (status) {
          const uploadedUrl = data?.url || data?.data?.url || "";
          ShowToast(message, Severty.SUCCESS);
          setFile([{ ...file, status: "done", url: uploadedUrl }]);
          setPreviewUrl(uploadedUrl);
          if (onChange) {
            onChange(uploadedUrl);
          }
        } else {
          ShowToast(message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  const beforeUpload = async (file) => {
    try {
      if (!fileType.includes(file.type)) {
        ShowToast("File format is not correct", Severty.ERROR);
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < size;
      if (!isLt2M) {
        ShowToast(`Image must be smaller than ${size} MB!`, Severty.ERROR);
        return false;
      }
      // isDimension && (await checkImageDimensions(file));
      return true;
    } catch (err) {
      ShowToast(err, Severty.ERROR);
      return false;
    }
  };

  const onRemove = () => {
    setFile([]);
    setPreviewUrl("");
    if (onChange) {
      onChange(null);
    }
  };

  useEffect(() => {
    setPreviewUrl(resolveAssetUrl(value, apiPath.assetURL));
    if (!value) setFile([]);
  }, [value]);

  return (
    <ImgCrop rotate quality={1} modalTitle="Crop Image" showGrid shape="round" modalClassName="bg-[#121212] text-white">
      <div className="flex flex-col items-center gap-4">
        {previewUrl ? (
          <div className="account-upload-preview relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-[22px] border border-[rgba(212,175,55,0.28)] bg-[#0e0e0e] shadow-[0_0_18px_rgba(212,175,55,0.12)]">
            <img src={previewUrl} alt="Selected preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={onRemove}
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(10,10,10,0.78)] text-[#f4d787] transition hover:border-[#d4af37] hover:text-[#ffd86d]"
              aria-label="Remove image"
            >
              <CloseOutlined className="text-[12px]" />
            </button>
          </div>
        ) : null}

        <Upload
          listType="text"
          showUploadList={false}
          maxCount={1}
          beforeUpload={beforeUpload}
          customRequest={handleImgChange}
          onRemove={onRemove}
          fileList={file}
          {...props}
        >
          <Button icon={<UploadOutlined />} loading={loading} className={`account-upload-photo-btn ${buttonClassName}`}>
            {btnName ? `${btnName}` : "Upload"}
          </Button>
        </Upload>
      </div>
    </ImgCrop>
  );
};

export default ProfileImageUpload;
