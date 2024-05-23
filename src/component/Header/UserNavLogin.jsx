import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const UserNavLoogin = () => {
  const { userInfor } = useSelector((state) => {
    return state.userReducer;
  });
  return (
    <li className=" text-gray-400 selection:hover:border-green-400 hover:text-green-400 cursor-pointer">
      <NavLink to={"/profile"} className="flex flex-wrap items-center">
        <span className=" pr-2">{userInfor?.user.name}</span>
        <img
          src={userInfor.user.avatar}
          alt=""
          className="w-10 h-10 rounded-full border object-cover  border-gray-400"
        />
      </NavLink>
    </li>
  );
};

export default UserNavLoogin;
