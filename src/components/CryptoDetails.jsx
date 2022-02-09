import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetchingHistory } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });
  const cryptoDetails = data?.data?.coin;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  if (isFetching) return "Loading...";

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.volume ? millify(cryptoDetails?.volume) : "-"
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title className="coin-name" level={2}>
          {cryptoDetails.name}
          {cryptoDetails.slug && `(${cryptoDetails.slug})`} Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={value => setTimePeriod(value)}
      >
        {time.map(date => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
        isLoading={isFetchingHistory}
        timePeriod={timePeriod}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title className="coin-details-heading" level={3}>
              {cryptoDetails.name} Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
            {stats.map(({ icon, title, value }, i) => (
              <Col className="coin-stats" key={i}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title className="coin-details-heading" level={3}>
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
            {genericStats.map(({ icon, title, value }, i) => (
              <Col className="coin-stats" key={i}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title className="coin-details heading" level={3}>
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title className="coin-details-heading" level={3}>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map(link => (
            <Row className="coin-link" key={link.name}>
              <Title className="link-name" level={5}>
                {link.type}
              </Title>
              <a href={link.url} target="blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
