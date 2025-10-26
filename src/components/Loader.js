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
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-12 h-12">
        {[10, 10, 10, 10].map((deg, idx) => (
          <div
            key={idx}
            className="absolute w-3 h-3 bg-green-500 rounded-full animate-spin-dot"
            style={{
              transform: `rotate(${deg}deg) translate(2px)`, // circle chhota
              animationDelay: `${idx * 0.1}s`, // thoda faster stagger
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
