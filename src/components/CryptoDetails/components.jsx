import { Col, Row, Typography, Select } from "antd";
import HTMLReactParser from "html-react-parser";
import { getCoinStats, getGenericStats } from "./statistics";

const { Title, Text } = Typography;
const { Option } = Select;

export const CoinHeading = ({ name, slug }) => (
  <Col className="coin-heading-container">
    <Title className="coin-name" level={2}>
      {name} {slug && `(${slug})`} Price
    </Title>
    <p>
      {name} live price in US dollars. View value statistics, market cap and
      supply
    </p>
  </Col>
);

export const TimePeriodSelect = ({ onChange }) => {
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  return (
    <Select
      defaultValue="7d"
      className="select-timeperiod"
      placeholder="Select Time Period"
      onChange={onChange}
    >
      {time.map(date => (
        <Option key={date}>{date}</Option>
      ))}
    </Select>
  );
};

export const CoinValueStatistics = ({ cryptoDetails }) => {
  const stats = getCoinStats(cryptoDetails);
  return (
    <Col className="coin-value-statistics">
      <Col className="coin-value-statistics-heading">
        <Title className="coin-details-heading" level={3}>
          {cryptoDetails.name} Statistics
        </Title>
        <p>An overview showing the stats of {cryptoDetails.name}</p>
        {stats?.map(({ icon, title, value }, i) => (
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
  );
};

export const CoinGenericStatistics = ({ cryptoDetails }) => {
  const stats = getGenericStats(cryptoDetails);
  return (
    <Col className="other-stats-info">
      <Col className="coin-value-statistics-heading">
        <Title className="coin-details-heading" level={3}>
          Other Statistics
        </Title>
        <p>An overview showing the stats of all cryptocurrencies</p>
        {stats?.map(({ icon, title, value }, i) => (
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
  );
};

export const CoinDescription = ({ name, description }) => (
  <Row className="coin-desc">
    <Title className="coin-details heading" level={3}>
      What is {name}
      {HTMLReactParser(description)}
    </Title>
  </Row>
);

export const CoinLinks = ({ name, links }) => (
  <Col className="coin-links">
    <Title className="coin-details-heading" level={3}>
      {name} Links
    </Title>
    {links?.map(link => (
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
);
