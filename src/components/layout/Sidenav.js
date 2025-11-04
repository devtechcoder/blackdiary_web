import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, PlusOutlined, RightCircleOutlined, LeftCircleFilled, LeftCircleOutlined } from "@ant-design/icons";
import { Layout, Input, Dropdown, Button, Menu } from "antd";

const { Sider } = Layout;

function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={250} collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} className="bg-[#121212] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
        {!collapsed && <span className="text-base font-semibold">Black Diary</span>}
        <Button type="flex items-center gap-2" icon={collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />} onClick={() => setCollapsed(!collapsed)} className="text-white" />
      </div>

      <div className="bg-[#1f1f1f] p-4 rounded">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded">
          <div className="text-white font-bold">
            {" "}
            <PlusOutlined className="text-lg cursor-pointer hover:opacity-80" />
            {!collapsed && "Add Diary"}
          </div>
        </div>

        <div className="bg-[#1f1f1f] p-4 rounded">
          <div className="text-white font-bold">❤️ {!collapsed && "Liked Diary"}</div>
        </div>
      </div>
    </Sider>
  );
}

export default Sidenav;
