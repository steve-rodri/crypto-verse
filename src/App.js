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

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
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
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
