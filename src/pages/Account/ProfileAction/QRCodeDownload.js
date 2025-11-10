import { useState, useRef } from "react";
import { QRCode } from "antd";
import html2canvas from "html2canvas";
import { Button } from "antd";
import Main from "../../../components/layout/Main";
import logo from "../../../assets/images/allLogo/black_white_logo.png";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../../constants/seo";
import { useAuthContext } from "../../../context/AuthContext";
import { WEB_LINK } from "../../../constants/Constants";
import { ShowToast, Severty } from "../../../helper/toast";
import { ShareAltOutlined, CopyOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { getOriginalUserName } from "../../../helper/functions";
const QRCodeDownload = () => {
  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const { username } = useParams();
  const [selectedColor, setSelectedColor] = useState("#000000");
  const qrRef = useRef();

  const colorPalette = ["#000000", "#2d3436", "#00B894", "#55efc4", "#006266", "#0984e3", "#74b9ff", "#6c5ce7", "#a29bfe", "#d63031", "#e17055", "#fdcb6e", "#fd79a8", "#e84393"];

  const handleDownload = async () => {
    const canvas = await html2canvas(qrRef.current);
    const link = document.createElement("a");
    link.download = "instagram_qr_code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const profileLink = `${WEB_LINK}/@${getOriginalUserName(username)}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(profileLink)
      .then(() => {
        ShowToast("Profile link copied to clipboard!", Severty.SUCCESS);
      })
      .catch((err) => {
        ShowToast("Failed to copy link.", Severty.ERROR);
        console.error("Failed to copy: ", err);
      });
  };

  const handleShare = () => {
    // This will open the native share dialog on supported platforms
    if (navigator.share) {
      navigator
        .share({
          title: `Check out ${getOriginalUserName(username)}'s profile on Black Diary!`,
          url: profileLink,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      ShowToast("Web Share API is not supported in this browser.", Severty.INFO);
      // Fallback for browsers that don't support Web Share API
      // You might want to offer a manual copy or other sharing options here.
      handleCopyLink(); // As a fallback, copy the link
    }
  };

  return (
    <Main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-400 p-4">
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row items-center gap-10">
          {/* QR Code Block */}
          <div ref={qrRef} className="bg-white p-4 rounded-xl border border-gray-200">
            <QRCode value={`${WEB_LINK}/${username}`} color={selectedColor} bgColor="#ffffff" size={200} icon={logo} />
            <p className="text-center mt-2 text-sm font-medium">{getOriginalUserName(username)}</p>
          </div>

          {/* Info & Color Options */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xl font-semibold mb-2">QR code helps people follow you quickly</h2>
            <p className="text-gray-600 mb-4 max-w-sm">
              People can scan your QR code with their smartphone's camera to see your profile. Download and print your QR code, then stick it on your products, posters and more.
            </p>

            {/* Color Picker */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {colorPalette.map((color, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-black" : "border-white"}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <Button type="primary" onClick={handleDownload}>
                Download QR code
              </Button>
              <Button onClick={handleShare} icon={<ShareAltOutlined />}>
                Share
              </Button>
              <Button onClick={handleCopyLink} icon={<CopyOutlined />}>
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default QRCodeDownload;
