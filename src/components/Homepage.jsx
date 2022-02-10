import React from "react";
import millifiy from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services";
import { Cryptocurrencies, News, Loader } from "../components";

const { Title } = Typography;

const Homepage = () => {
  return (
    <>
      <GlobalCryptoStats />
      <Top10Cryptos />
      <LatestNews />
    </>
  );
};

const GlobalCryptoStats = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const stats = data?.data?.stats;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {isFetching ? (
        <Loader />
      ) : (
        <Row>
          <Col span={12}>
            <Statistic title="Total Cryptocurrencies" value={stats.total} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millifiy(stats.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={millifiy(stats.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={millifiy(stats.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millifiy(stats.totalMarkets)}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

const Top10Cryptos = () => (
  <>
    <div className="home-heading-container">
      <Title level={2} className="home-title">
        Top 10 Cryptocurrencies in the world
      </Title>
      <Title level={3} className="show-more">
        <Link to="/cryptocurrencies">Show More</Link>
      </Title>
    </div>
    <Cryptocurrencies simplified />
  </>
);

const LatestNews = () => (
  <>
    <div className="home-heading-container">
      <Title level={2} className="home-title">
        Latest Crypto News
      </Title>
      <Title level={3} className="show-more">
        <Link to="/news">Show More</Link>
      </Title>
    </div>
    <News simplified />
  </>
);

export default Homepage;
