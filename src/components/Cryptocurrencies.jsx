import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link, useOutlet, Outlet } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi.js";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const outlet = useOutlet();
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  if (outlet) return <Outlet />;
  if (isFetching) return <Loader />;
  return (
    <>
      <Outlet />
      {!simplified && (
        <SearchField
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(currency => (
          <CurrencyCard currency={currency} />
        ))}
      </Row>
    </>
  );
};

const SearchField = props => (
  <div className="search-crypto">
    <Input placeholder="Search Cryptocurrencies" {...props} />
  </div>
);

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
