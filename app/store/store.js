import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import cartSlice from "./Slices/cartSlices";
import wishlistSlice from "./Slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});
