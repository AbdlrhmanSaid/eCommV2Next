"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/Slices/productSlice";
import Link from "next/link";
import Heading from "../_components/Heading";
import Breadcrumb from "../_components/Breadcrumb";
import AllProducts from "../_components/AllProducts";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Heading title={"Our Products "} isMargin={true} />

      <Breadcrumb />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 p-6 ">
        {products.map((product, index) => (
          <AllProducts product={product} index={index} />
        ))}
      </div>
    </>
  );
};

export default Products;
