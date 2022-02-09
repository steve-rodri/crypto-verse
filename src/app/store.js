import { configureStore } from "@reduxjs/toolkit";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { coinRankingApi } from "../services/coinRankingApi";

export default configureStore({
  reducer: {
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [coinRankingApi.reducerPath]: coinRankingApi.reducer,
  },
});
