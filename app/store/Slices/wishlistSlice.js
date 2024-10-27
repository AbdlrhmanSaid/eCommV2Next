import { createSlice } from "@reduxjs/toolkit";

const loadWishListFromLocalStorage = () => {
  try {
    const serializedWish = localStorage.getItem("wishlist"); // التأكد من استخدام المفتاح الصحيح
    return serializedWish ? JSON.parse(serializedWish) : [];
  } catch (error) {
    console.error("Error loading Wish from localStorage:", error);
    return [];
  }
};

const saveWishListToLocalStorage = (wish) => {
  try {
    const serializedWish = JSON.stringify(wish);
    localStorage.setItem("wishlist", serializedWish); // استخدام نفس المفتاح "wishlist"
  } catch (error) {
    console.error("Error saving wish to localStorage:", error);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: loadWishListFromLocalStorage(),
  },
  reducers: {
    addToWishList: (state, action) => {
      const itemId = action.payload;
      if (!state.wishlist.some((item) => item.id === itemId)) {
        state.wishlist.push({ id: itemId });
        saveWishListToLocalStorage(state.wishlist);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== itemId);
      saveWishListToLocalStorage(state.wishlist);
    },
  },
});

export const { addToWishList, removeItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
