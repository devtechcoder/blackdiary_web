import { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { MenuOutlined } from "@ant-design/icons";
import BottomNav from "./BottomNav";

const { Content } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDrawer = () => setVisible(true);

  return (
    <Layout className="layout-dashboard h-screen overflow-hidden bg-[#181818]">
      {isMobile ? (
        <>
          <Header showDrawer={showDrawer} isMobile={isMobile} />
          <Content className="overflow-y-auto p-4 pb-20 text-white bg-[#181818] flex-grow">{children}</Content>
          <BottomNav />
        </>
      ) : (
        <Layout className="h-full">
          <Sidenav />
          <Layout className="flex flex-col">
            <Content className="overflow-y-auto text-white bg-black">
              <div className="p-4">{children}</div>
              <Footer />
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}

export default Main;
