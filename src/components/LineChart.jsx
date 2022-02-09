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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  coinHistory?.data?.history?.forEach((_, i) => {
    coinPrice.push(coinHistory.data.history[i].price);
    if (timePeriod.match("h"))
      coinTimestamp.unshift(
        moment
          .unix(coinHistory.data.history[i].timestamp)
          .toDate()
          .toLocaleTimeString()
      );
    else
      coinTimestamp.unshift(
        moment
          .unix(coinHistory.data.history[i].timestamp)
          .toDate()
          .toLocaleDateString()
      );
  });

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
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
      <Row className="chart-header">
        <Typography.Title className="chart-title" level={2}>
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title className="price-change" level={5}>
            {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title className="current-price" level={5}>
            Current {coinName} Price: ${currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
