import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

import { useGetCryptoHistoryQuery } from "../services";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const reduceCoinHistory = (coinHistory, timePeriod) => {
  if (!coinHistory?.data?.history) return [[], []];
  return coinHistory.data.history.reduce(
    (tuple, { price, timestamp }) => {
      tuple[0].unshift(price);
      timestamp = moment.unix(timestamp).toDate();
      const hourly = timePeriod.match("h");
      if (hourly) tuple[1].unshift(timestamp.toLocaleTimeString());
      else tuple[1].unshift(timestamp.toLocaleDateString());
      return tuple;
    },
    [[], []]
  );
};

const LineChart = ({ coinId, timePeriod, ...rest }) => {
  const params = { coinId, timePeriod };
  const { data: coinHistory } = useGetCryptoHistoryQuery(params);
  const [prices, timestamps] = reduceCoinHistory(coinHistory, timePeriod);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Price in USD",
        data: prices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <ChartHeader {...rest} change={coinHistory?.data?.change || 0} />
      <Line data={data} options={options} />
    </>
  );
};

const ChartHeader = ({ coinName, currentPrice, change }) => (
  <Row className="chart-header">
    <Typography.Title className="chart-title" level={2}>
      {coinName} Price Chart
    </Typography.Title>
    <Col className="price-container">
      <Typography.Title className="price-change" level={5}>
        {change}%
      </Typography.Title>
      <Typography.Title className="current-price" level={5}>
        Current {coinName} Price: ${currentPrice}
      </Typography.Title>
    </Col>
  </Row>
);

export default LineChart;
