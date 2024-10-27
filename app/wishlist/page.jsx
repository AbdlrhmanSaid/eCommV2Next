"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Heading from "../_components/Heading";
import { removeItem } from "../store/Slices/wishlistSlice";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const fetchedItems = await Promise.all(
          wishlist.map(async (item) => {
            const response = await axios.get(
              `https://fakestoreapi.com/products/${item.id}`
            );
            return response.data;
          })
        );
        setWishlistDetails(fetchedItems);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    if (wishlist.length > 0) {
      fetchWishlistItems();
    }
  }, [wishlist]);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <Heading title={"Your Wishlist"} isMargin={true} />
            </header>
            {wishlist.length > 0 ? (
              <div className="mt-8">
                <ul className="space-y-4">
                  {wishlistDetails.length > 0
                    ? wishlistDetails.map((item) => (
                        <li key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="size-16 rounded object-cover"
                          />
                          <div>
                            <h3 className="text-sm text-gray-900">
                              {item.title}
                            </h3>
                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">{item.price}$</dt>
                              </div>
                              <div>
                                <dt className="inline">{item.category}</dt>
                              </div>
                            </dl>
                          </div>
                          <div className="flex flex-1 items-center justify-end gap-2">
                            <button
                              className="text-gray-600 transition hover:text-red-600"
                              onClick={() => handleRemove(item.id)}
                              k
                            >
                              <span className="sr-only">Remove item</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            ) : (
              <p className="bg-slate-500 p-3 text-white ">
                No Products In Your Wishlist
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
