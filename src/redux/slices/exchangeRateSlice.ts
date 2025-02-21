import { createSlice } from "@reduxjs/toolkit";

interface PriceState {
  exchangeRate: number;
}

const initialState: PriceState = {
  exchangeRate: 13000,
};

const priceSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
  },
});

export default priceSlice.reducer;
export const { setExchangeRate } = priceSlice.actions;
