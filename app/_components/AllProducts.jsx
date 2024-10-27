"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/Slices/cartSlices";
import { addToWishList, removeItem } from "../store/Slices/wishlistSlice"; // استدعاء addToWishList
import { FaHeart } from "react-icons/fa";

const AllProducts = React.memo(({ product }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isFavorite, setIsFavorite] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
  };

  const handleAddToWishList = () => {
    if (wishlist.find((item) => item.id === product.id)) {
      alert("Item already in wishlist");
      return;
    }
    dispatch(addToWishList(product.id));
    setIsFavorite(true);
  };

  const handleRemoveFromWishList = () => {
    dispatch(removeItem(product.id));
    setIsFavorite(false);
  };

  return (
    <div
      className="group relative block overflow-hidden h-full shadow-lg rounded-lg"
      key={product.id}
    >
      <button
        className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
        onClick={isFavorite ? handleRemoveFromWishList : handleAddToWishList}
      >
        <span className="sr-only">Wishlist</span>
        <FaHeart className={isFavorite ? "text-red-400" : ""} />
      </button>

      <div className="w-full h-48 object-cover mb-4 rounded-md font-medium text-sm p-1 truncate">
        <img
          alt={product.title}
          src={product.image}
          width={100}
          height={100}
          className="m-auto"
        />
      </div>

      <div className="relative border border-gray-100 bg-white p-6 flex flex-col h-full justify-between">
        <div>
          <p className="text-gray-700">${product.price}</p>

          <h3 className="mt-1.5 text-lg font-medium text-gray-900 truncate">
            {product.title}
          </h3>

          <p className="mt-1.5 line-clamp-3 text-gray-700 font-medium text-sm w-full p-1 rounded truncate">
            {product.description}
          </p>

          <button
            className="p-3 rounded bg-gray-700 text-white"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
          <button className="p-3 rounded bg-blue-700 ms-2 text-white">
            <Link href={`/products/${product.id}`}>View</Link>
          </button>
        </div>
      </div>
    </div>
  );
});

export default AllProducts;
