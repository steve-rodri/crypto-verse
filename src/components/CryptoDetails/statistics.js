import millify from "millify";
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

export const getCoinStats = cryptoDetails => [
  {
    title: "Price to USD",
    value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
    icon: <DollarCircleOutlined />,
  },
  { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
  {
    title: "24h Volume",
    value: `$ ${cryptoDetails?.volume ? millify(cryptoDetails?.volume) : "-"}`,
    icon: <ThunderboltOutlined />,
  },
  {
    title: "Market Cap",
    value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
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

export const getGenericStats = cryptoDetails => [
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
