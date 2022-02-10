import { configureStore } from "@reduxjs/toolkit";
import { bingNewsApi, coinRankingApi } from "./services";

export default configureStore({
  reducer: {
    [coinRankingApi.reducerPath]: coinRankingApi.reducer,
    [bingNewsApi.reducerPath]: bingNewsApi.reducer,
  },
});
