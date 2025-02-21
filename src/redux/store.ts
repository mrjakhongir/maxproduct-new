import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import formReducer from "./slices/formSlice";
import exchangeRateReducer from "./slices/exchangeRateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    exchangeRate: exchangeRateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
