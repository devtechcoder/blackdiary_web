import { useState, useEffect } from "react";
import { Layout } from "antd";
import PublicHeader from "./publicHeader";
import Footer from "./Footer";

const { Content } = Layout;

function PublicLayout({ children, contentClassName = "p-4 text-white bg-[#0d0d0d] flex flex-col flex-1", containerClassName = "bd-container flex flex-col flex-1" }) {
  const hasWindow = typeof window !== "undefined";
  const [isMobile, setIsMobile] = useState(hasWindow ? window.innerWidth < 768 : false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    if (!hasWindow) return undefined;
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="layout-dashboard min-h-screen bg-[#0d0d0d]">
      <PublicHeader isMobile={isMobile} />
      <Layout className="flex flex-col flex-1 bg-[#0d0d0d] overflow-x-hidden">
        <Content className={contentClassName}>
          <div className={containerClassName}>
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default PublicLayout;
