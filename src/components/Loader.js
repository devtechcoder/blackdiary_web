import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 42,
      color: `#fff`,
    }}
    spin
  />
);

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-32 h-32 animate-spin-slow">
        {/* First piece (Spotify Green) */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#1DB954] rounded-full animate-spin piece-1"></div>

        {/* Second piece (Spotify Gradient) */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded animate-spin piece-2"></div>

        {/* <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#191414] rounded-full animate-spin piece-2"></div> */}

        {/* Third piece (Spotify Dark Gray) */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#535353] rounded-full animate-spin piece-3"></div>
      </div>
    </div>
  );
};

export default Loader;
