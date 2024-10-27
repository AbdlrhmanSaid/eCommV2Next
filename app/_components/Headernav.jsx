"use client";
import { useState, useEffect } from "react";
import logo from "../public/genetic-data-svgrepo-com.svg";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MiniCart from "./MiniCart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Headernav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state to check client-side rendering
  const pathname = usePathname();
  const { cart } = useSelector((state) => state.cart);

  // Set isClient to true when component is rendered on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const pathNameArray = pathname.split("/").filter((item) => item);

    if (pathNameArray[0] === "sign-in" || pathNameArray[0] === "sign-up") {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    !isHidden && (
      <>
        <header
          className={`fixed top-0 left-0 w-full z-50 ${
            isScroll && `shadow-lg bg-gray-300`
          } `}
        >
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Link className="block text-cyan-600" href="/">
              <Image alt="Logo" src={logo} width={60} height={60} />
            </Link>
            <div className="flex flex-1 items-center justify-end md:justify-between">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/products"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/services"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/wishlist"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/orders"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex gap-4 flex items-center">
                  <SignedIn>
                    <UserButton onClick={() => setIsCartOpen(false)} />
                    <button
                      className="text-white flex items-center bg-blue-600 rounded-full p-1 text-2xl cursor-pointer"
                      onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                      <MdOutlineShoppingCart className="text-sm" />
                      {isClient && cart && (
                        <p className="text-sm">{cart.length}</p>
                      )}
                    </button>
                  </SignedIn>
                </div>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                >
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <ul className="absolute bg-slate-100 top-20 w-[200px] right-6 md:hidden border shadow-2xl">
                  <li>
                    <Link
                      href="/about"
                      className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/orders"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </header>
        {isCartOpen && (
          <>
            <MiniCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          </>
        )}
      </>
    )
  );
};

export default Headernav;
