import { configureStore } from "@reduxjs/toolkit";
import { coinRankingApi } from "../services/coinRankingApi";
import { bingNewsApi } from "../services/bingNewsApi";

export default configureStore({
  reducer: {
    [coinRankingApi.reducerPath]: coinRankingApi.reducer,
    [bingNewsApi.reducerPath]: bingNewsApi.reducer,
  },
});
