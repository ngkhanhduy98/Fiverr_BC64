import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import MenuLoaiCongViec from "./MenuLoaiCongViec";
import IndexHeader from "./IndexHeader";
const Header = () => {
  useEffect(() => {}, []);
  return (
    <div className="">
      <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-6 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center">
          <svg
            width={89}
            height={27}
            viewBox="0 0 89 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#404145">
              <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
            </g>
            <g fill="#1dbf73">
              <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" />
            </g>
          </svg>
          <form action="" className=" xl:flex flex-wrap ml-7 hidden">
            <input
              type="text"
              id="first_name"
              className="w-[550px] border border-gray-300 text-gray-900 text-base font-medium rounded-l-[5px] block px-4 py-2 focus:border-red-600 "
              placeholder="What service aur you looking for today ?"
              required
            />
            <div
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 rounded-r-md text-white w-12 cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-white mx-auto mt-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="true"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="font-medium text-lg flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-1.5 px-3 text-gray-600 hover:text-green-600 rounded "
                  aria-current="page"
                >
                  Become a seller
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1.5 px-3 text-gray-600 hover:text-green-600 rounded "
                  aria-current="page"
                >
                  Become a seller
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-base block py-1 px-3 border border-green-600 text-green-600 hover:bg-green-500 hover:text-white duration-300 rounded "
                  aria-current="page"
                >
                  Join
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MenuLoaiCongViec></MenuLoaiCongViec>
    </div>
  );
};

export default Header;
