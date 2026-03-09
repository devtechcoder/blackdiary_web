import { Button, Input, Slider, Upload } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { ShowToast, Severty } from "../../helper/toast";
import ImgCrop from "antd-img-crop";

const ImageCustomize = ({ fileType, value, imageType, btnName, onChange, size = 5, isDimension = false, ...props }) => {
  const [file, setFile] = useState([]);
  const [baseFile, setBaseFile] = useState(null);
  const [basePreview, setBasePreview] = useState("");
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(36);
  const [xPercent, setXPercent] = useState(50);
  const [yPercent, setYPercent] = useState(50);
  const objectUrlRef = useRef("");
  const internalUpdateRef = useRef(false);

  const syncFileList = (selectedFile, previewUrl) => {
    setFile([
      {
        uid: String(selectedFile.lastModified || Date.now()),
        name: selectedFile.name,
        status: "done",
        originFileObj: selectedFile,
        thumbUrl: previewUrl,
      },
    ]);
  };

  const setPreviewFromFile = (selectedFile) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const localUrl = URL.createObjectURL(selectedFile);
    objectUrlRef.current = localUrl;
    setBasePreview(localUrl);
    return localUrl;
  };

  const handleImgChange = ({ file: currentFile, fileList }) => {
    if (currentFile?.status === "removed" || !fileList?.length) {
      setFile([]);
      setBaseFile(null);
      setBasePreview("");
      setText("");
      if (onChange) {
        onChange(null);
      }
      return;
    }

    const selectedFile = currentFile?.originFileObj || currentFile;
    if (!(selectedFile instanceof File)) {
      return;
    }
    setBaseFile(selectedFile);
    const previewUrl = setPreviewFromFile(selectedFile);
    syncFileList(selectedFile, previewUrl);
    if (onChange) {
      internalUpdateRef.current = true;
      onChange(selectedFile);
    }
  };

  const beforeUpload = async (file) => {
    try {
      if (fileType.includes(file.type)) {
      } else {
        ShowToast("File format is not correct", Severty.ERROR);
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < size;

      if (!isLt2M) {
        ShowToast(`Image must be smaller than ${size} MB!`, Severty.ERROR);
        return Upload.LIST_IGNORE;
      }
      // isDimension && (await checkImageDimensions(file))
      return false;
    } catch (err) {
      ShowToast(err, Severty.ERROR);
      return Upload.LIST_IGNORE;
    }
  };

  const onRemove = () => {
    setFile([]);
    setBaseFile(null);
    setBasePreview("");
    setText("");
    if (onChange) {
      onChange(null);
    }
  };

  const editorStyle = useMemo(
    () => ({
      left: `${xPercent}%`,
      top: `${yPercent}%`,
      color: textColor,
      fontSize: `${fontSize}px`,
      transform: "translate(-50%, -50%)",
      position: "absolute",
      fontWeight: 700,
      textShadow: "0 2px 12px rgba(0,0,0,0.55)",
      pointerEvents: "none",
      whiteSpace: "pre-wrap",
      textAlign: "center",
      maxWidth: "90%",
    }),
    [xPercent, yPercent, textColor, fontSize]
  );

  const createComposedImage = async (selectedFile) => {
    if (!selectedFile) {
      return null;
    }
    if (!text.trim()) {
      return selectedFile;
    }
    const imageUrl = URL.createObjectURL(selectedFile);
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return selectedFile;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Math.max(14, Math.round((fontSize / 100) * canvas.width))}px sans-serif`;
      ctx.fillText(text, (xPercent / 100) * canvas.width, (yPercent / 100) * canvas.height);

      const mimeType = selectedFile.type || "image/jpeg";
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, 0.95));
      if (!blob) {
        return selectedFile;
      }

      return new File([blob], selectedFile.name, { type: mimeType, lastModified: Date.now() });
    } catch (err) {
      ShowToast("Failed to add text on image.", Severty.ERROR);
      return selectedFile;
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const updateEditedFile = async () => {
      if (!baseFile) {
        return;
      }
      const editedFile = await createComposedImage(baseFile);
      if (isMounted && onChange) {
        internalUpdateRef.current = true;
        onChange(editedFile);
      }
    };
    updateEditedFile();
    return () => {
      isMounted = false;
    };
  }, [baseFile, text, textColor, fontSize, xPercent, yPercent]);

  useEffect(() => {
    if (internalUpdateRef.current) {
      internalUpdateRef.current = false;
      return;
    }

    if (!value) {
      setFile([]);
      setBaseFile(null);
      setBasePreview("");
      return;
    }

    if (typeof value === "string") {
      setFile([
        {
          uid: "-1",
          name: "image",
          status: "done",
          url: value,
        },
      ]);
      setBasePreview(value);
      return;
    }

    if (value instanceof File) {
      const previewUrl = setPreviewFromFile(value);
      setBaseFile(value);
      setFile([
        {
          uid: String(value.lastModified || Date.now()),
          name: value.name,
          status: "done",
          originFileObj: value,
          thumbUrl: previewUrl,
        },
      ]);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 image-customize-panel">
      <ImgCrop quality={1} modalTitle="Crop Image" showGrid>
        <Upload className="publish-image-upload" listType="picture" maxCount={1} beforeUpload={beforeUpload} onChange={handleImgChange} onRemove={onRemove} fileList={file} {...props}>
          {file && file.length > 0 && file !== "" ? null : (
            <Button
              icon={<UploadOutlined />}
              className="!h-11 !rounded-[10px] !border !border-[#3a3a3a] !bg-[#151515] !px-5 !font-medium !text-[#e9e9e9] transition-all duration-300 hover:!border-[#D4AF37]/60 hover:!text-[#D4AF37]"
            >
              {btnName ? `Upload ${btnName}` : ""}
            </Button>
          )}
        </Upload>
      </ImgCrop>

      {basePreview ? (
        <div className="rounded-xl border border-[#2f2f2f] bg-[#0f0f0f] p-3 sm:p-4">
          <p className="mb-3 text-base font-semibold text-[#f0f0f0]">Edit Image</p>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#2a2a2a] bg-black">
            <img src={basePreview} alt="preview" className="mx-auto max-h-[360px] min-h-[220px] w-auto object-contain sm:max-h-[420px]" />
            {text.trim() ? <div style={editorStyle}>{text}</div> : null}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-[#cfcfcf]">Text on image</label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write text on image"
                maxLength={120}
                className="!h-11 !rounded-[10px] !border-[#313131] !bg-[#0d0d0d] !text-[#ececec] !shadow-none hover:!border-[#D4AF37]/60 focus:!border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#cfcfcf]">Text Color</label>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-11 w-full cursor-pointer rounded-[10px] border border-[#313131] bg-[#0d0d0d] p-1" />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-[#cfcfcf]">Font Size</label>
                <span className="text-xs text-[#9e9e9e]">{fontSize}px</span>
              </div>
              <Slider className="publish-slider" min={16} max={80} value={fontSize} onChange={setFontSize} />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-[#cfcfcf]">Horizontal Position</label>
                <span className="text-xs text-[#9e9e9e]">{xPercent}%</span>
              </div>
              <Slider className="publish-slider" min={0} max={100} value={xPercent} onChange={setXPercent} />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-[#cfcfcf]">Vertical Position</label>
                <span className="text-xs text-[#9e9e9e]">{yPercent}%</span>
              </div>
              <Slider className="publish-slider" min={0} max={100} value={yPercent} onChange={setYPercent} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageCustomize;
