import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Input, Dropdown, Button, Menu } from "antd";

const { Sider } = Layout;

function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const sortMenu = (
    <Menu>
      <Menu.Item key="recent">Recents</Menu.Item>
      <Menu.Item key="recently-added">Recently Added</Menu.Item>
      <Menu.Item key="alphabetical">Alphabetical</Menu.Item>
      <Menu.Item key="creator">Creator</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="view-list" icon={<BarsOutlined />}></Menu.Item>
      <Menu.Item key="view-grid" icon={<AppstoreOutlined />}></Menu.Item>
    </Menu>
  );

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      className="bg-[#121212] text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="text-white"
        />
        {!collapsed && (
          <span className="text-base font-semibold">Your Library</span>
        )}
        <div className="flex items-center gap-2">
          {!collapsed && (
            <PlusOutlined className="text-lg cursor-pointer hover:opacity-80" />
          )}
        </div>
      </div>

      {/* Filter/Search */}
      <div className="px-4 mt-4">
        {!collapsed && (
          <div className="mb-4">
            <div className="bg-[#2a2a2a] inline-block px-3 py-1 rounded-full text-sm">
              Playlists
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          {searchVisible ? (
            <Input
              placeholder="Search..."
              className="bg-[#1f1f1f] text-white"
              prefix={<SearchOutlined />}
              onBlur={() => setSearchVisible(false)}
            />
          ) : (
            <SearchOutlined
              className="text-lg cursor-pointer"
              onClick={() => setSearchVisible(true)}
            />
          )}

          {/* Recents Dropdown */}
          {!collapsed && (
            <Dropdown
              overlay={sortMenu}
              trigger={["click"]}
              placement="bottomRight"
              open={popupVisible}
              onOpenChange={setPopupVisible}
            >
              <div className="flex items-center gap-1 text-sm cursor-pointer">
                Recents <AppstoreOutlined />
              </div>
            </Dropdown>
          )}
        </div>
      </div>

      {/* Playlist cards */}
      <div className="p-4 grid grid-cols-1 gap-3">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded">
          <div className="text-white font-bold">❤️ Liked Diary</div>
        </div>
        <div className="bg-[#1f1f1f] p-4 rounded">
          <div className="text-white font-bold">🎵 Aashiqi Diary</div>
        </div>
      </div>
    </Sider>
  );
}

export default Sidenav;
