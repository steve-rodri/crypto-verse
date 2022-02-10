import { useState, useEffect } from "react";
import { Link, useOutlet, Outlet } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import Loader from "./Loader";
import millify from "millify";

import { useGetCryptosQuery } from "../services";

const Cryptocurrencies = ({ simplified }) => {
  const outlet = useOutlet();
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = useGetCryptosQuery(simplified ? 10 : 100);

  // filter cryptos based on searchTerm
  useEffect(() => {
    setCryptos(
      data?.data?.coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  if (outlet) return <Outlet />;
  if (isFetching) return <Loader />;
  return (
    <>
      <SearchField
        show={!simplified}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(currency => (
          <CurrencyCard currency={currency} />
        ))}
      </Row>
    </>
  );
};

const SearchField = ({ show, ...rest }) => {
  if (!show) return null;
  return (
    <div className="search-crypto">
      <Input placeholder="Search Cryptocurrencies" {...rest} />
    </div>
  );
};

const CurrencyCard = ({ currency }) => (
  <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
    <Link to={`/cryptocurrencies/${currency.uuid}`}>
      <Card
        title={`${currency.rank} ${currency.name}`}
        hoverable
        extra={
          <img
            className="crypto-image"
            src={currency.iconUrl}
            alt={currency.name}
          />
        }
      >
        <p>Price: ${millify(currency.price)}</p>
        <p>Market Cap: ${millify(currency.marketCap)}</p>
        <p>Daily Change: {millify(currency.change)}%</p>
      </Card>
    </Link>
  </Col>
);

export default Cryptocurrencies;
