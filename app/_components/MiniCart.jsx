"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { removeItem } from "../store/Slices/cartSlices";
import { useSelector, useDispatch } from "react-redux";

const MiniCart = ({ isCartOpen, setIsCartOpen }) => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const fetchedItems = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(
              `https://fakestoreapi.com/products/${item.id}`
            );
            return response.data;
          })
        );
        setCartDetails(fetchedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (cart.length > 0) {
      fetchCartItems();
    }
  }, [cart]);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div
      className="z-50 fixed right-16 top-20 w-screen max-w-sm border shadow bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <button
        className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <span className="sr-only">Close cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6 overflow-y-auto max-h-80">
        {" "}
        {cartDetails.length ? (
          <ul className="space-y-4">
            {cartDetails.map((product) => (
              <li key={product.id} className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="size-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">{product.title}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Price:</dt>
                      <dd className="inline">${product.price}</dd>
                    </div>
                  </dl>
                </div>
                <button
                  className="text-gray-600 transition hover:text-red-600 ms-auto"
                  onClick={() => handleRemove(product.id)}
                  k
                >
                  <MdDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty</p>
        )}
        <div className="space-y-4 text-center">
          <a
            href="/cart"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({cart.length})
          </a>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
