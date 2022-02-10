import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./App.css";

import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";

const { Title } = Typography;

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Main />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const Main = () => (
  <Layout>
    <div className="routes">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/cryptocurrencies" element={<Cryptocurrencies />}>
          <Route path=":coinId" element={<CryptoDetails />} />
        </Route>
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  </Layout>
);

const Footer = () => (
  <>
    <Title level={5} style={{ color: "white", textAlign: "center" }}>
      Cryptoverse <br />
      All rights reserved
    </Title>
    <Space>
      <Link to="/">Home</Link>
      <Link to="/exchanges">Exchanges</Link>
      <Link to="/news">News</Link>
    </Space>
  </>
);

export default App;
