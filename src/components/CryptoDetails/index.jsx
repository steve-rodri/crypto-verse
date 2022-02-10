import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery } from "../../services";
import Loader from "../Loader";
import LineChart from "../LineChart";
import {
  CoinHeading,
  TimePeriodSelect,
  CoinValueStatistics,
  CoinGenericStatistics,
  CoinDescription,
  CoinLinks,
} from "./components";
import { Col } from "antd";
import millify from "millify";

export const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin || {};

  if (isFetching) return <Loader />;

  return (
    <Col className="coin-detail-container">
      <CoinHeading {...cryptoDetails} />
      <TimePeriodSelect onChange={value => setTimePeriod(value)} />
      <LineChart
        coinId={coinId}
        coinName={cryptoDetails.name}
        timePeriod={timePeriod}
        currentPrice={millify(cryptoDetails.price)}
      />
      <Col className="stats-container">
        <CoinValueStatistics cryptoDetails={cryptoDetails} />
        <CoinGenericStatistics cryptoDetails={cryptoDetails} />
      </Col>
      <Col className="coin-desc-link">
        <CoinDescription {...cryptoDetails} />
        <CoinLinks {...cryptoDetails} />
      </Col>
    </Col>
  );
};

export default CryptoDetails;
