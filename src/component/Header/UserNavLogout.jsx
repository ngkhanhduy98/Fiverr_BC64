import React from "react";
import { NavLink } from "react-router-dom";

const UserNavLogout = () => {
  return (
    <div className=" flex flex-wrap items-center">
      <li>
        <p
          className="mr-4 block cursor-pointer py-1.5 text-lg text-gray-600 hover:text-green-600 rounded "
          aria-current="page"
        >
          Sign in
        </p>
      </li>
      <li>
        <p
          className=" text-base block py-1 px-3 border border-green-600 text-green-600 hover:bg-green-500 hover:text-white duration-300 rounded "
          aria-current="page"
        >
          <NavLink to={"/auth/login"}>Join</NavLink>
        </p>
      </li>
    </div>
  );
};

export default UserNavLogout;
