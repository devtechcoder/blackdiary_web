import { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Sidenav from "./Sidenav";
import PublicHeader from "./publicHeader";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

const { Content } = Layout;

function PublicLayout({ children }) {
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
    <Layout className="layout-dashboard h-screen overflow-hidden bg-white">
      <PublicHeader showDrawer={showDrawer} isMobile={isMobile} />

      <Layout className="h-[calc(100vh-64px)] overflow-hidden flex flex-col flex-1">
        <Content className="overflow-y-auto p-4 text-white bg-white flex-grow">
          {children}
          <Footer />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PublicLayout;
