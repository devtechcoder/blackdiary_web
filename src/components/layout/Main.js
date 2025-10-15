import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  return (
    <Layout className="layout-dashboard h-screen overflow-hidden bg-[#181818]">
      {/* Fixed Header */}
      <Header />

      {/* Main Layout: Side + Content */}
      <Layout>
        {/* Fixed Sidenav */}
        <Sidenav />

        {/* Scrollable Content area that naturally pushes Footer to bottom */}
        <Layout className="h-[calc(100vh-64px)] overflow-hidden flex flex-col flex-1">
          <Content className="overflow-y-auto p-4 text-white bg-[#181818] flex-grow">
            {children}
            <Footer />
          </Content>

          {/* Footer - Comes after content naturally */}
        </Layout>
      </Layout>
    </Layout>
    // <Layout className="layout-dashboard min-h-screen bg-[#181818]">
    //   <Header />

    //   <Layout>
    //     <Sidenav />
    //     <Layout>
    //       <Content className="content-ant p-4 text-white">{children}</Content>
    //       <Footer />
    //     </Layout>
    //   </Layout>
    // </Layout>
  );
}

export default Main;
