import { useState, useRef } from "react";
import { QRCode } from "antd";
import html2canvas from "html2canvas";
import { Button } from "antd";
import Main from "../../../components/layout/Main";
import logo from "../../../assets/images/allLogo/black_white_logo.png";

const QRCodeDownload = () => {
  const [selectedColor, setSelectedColor] = useState("#00B894");
  const qrRef = useRef();

  const colorPalette = ["#000000", "#2d3436", "#00B894", "#0984e3", "#6c5ce7", "#fd79a8", "#e17055", "#fab1a0", "#e84393"];

  const handleDownload = async () => {
    const canvas = await html2canvas(qrRef.current);
    const link = document.createElement("a");
    link.download = "instagram_qr_code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-400 p-4">
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row items-center gap-10">
          {/* QR Code Block */}
          <div ref={qrRef} className="bg-white p-4 rounded-xl border border-gray-200">
            <QRCode value="https://www.instagram.com/_jyotiradityachaudhary?igsh=MWFwd2g0ODBsZjByeA==" color={selectedColor} bgColor="#ffffff" size={200} icon={logo} />
            <p className="text-center mt-2 text-sm font-medium">BLACKDIARY_00</p>
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

            {/* Download Button */}
            <Button type="primary" onClick={handleDownload}>
              Download QR code
            </Button>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default QRCodeDownload;
