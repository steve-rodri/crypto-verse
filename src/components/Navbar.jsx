import React, { useState, useEffect } from "react";
import { Button, Menu as AntMenu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons/lib/icons";
import icon from "../images/cryptocurrency.png";

const { Title } = Typography;
const { Item } = AntMenu;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Title>
        <HamburgerButton onClick={() => setActiveMenu(!activeMenu)} />
      </div>
      {activeMenu && <Menu />}
    </div>
  );
};

const HamburgerButton = ({ onClick }) => (
  <Button className="menu-control-container" onClick={onClick}>
    <MenuOutlined />
  </Button>
);

const Menu = () => (
  <AntMenu theme="dark">
    <Item icon={<HomeOutlined />} key={1}>
      <Link to="/">Home</Link>
    </Item>
    <Item icon={<FundOutlined />} key={2}>
      <Link to="/cryptocurrencies">Cryptocurrencies</Link>
    </Item>
    <Item icon={<MoneyCollectOutlined />} key={3}>
      <Link to="/exchanges">Exchanges</Link>
    </Item>
    <Item icon={<BulbOutlined />} key={4}>
      <Link to="/news">News</Link>
    </Item>
  </AntMenu>
);

export default Navbar;
