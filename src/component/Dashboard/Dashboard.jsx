import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOutAction } from "../../redux/userReducer/userSlice";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { userInfor } = useSelector((state) => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOutAction());
    navigate("/");
    Swal.fire({
      title: "Done",
      text: "Bạn đã đăng xuất thành công",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
  };
  return (
    <div className=" bg-slate-800 h-[100vh] p-5 relative">
      <div className="cursor-pointer py-10">
        <NavLink to={"/"}>
          <svg
            className="mx-auto fill-white"
            width={89}
            height={27}
            viewBox="0 0 89 27"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="white">
              <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
            </g>
            <g fill="#1dbf73">
              <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" />
            </g>
          </svg>
        </NavLink>
      </div>
      <h3 className="text-xl font-semibold text-white">Menu</h3>
      {/* Quản lý người dùng */}
      <div className=" text-white bg-slate-800 hover:bg-slate-600 rounded-lg py-2 px-5 my-5 cursor-pointer">
        <NavLink to={`/admin`}>Quản lý người dùng</NavLink>
      </div>
      {/* Quản lý công việc  */}
      <div className=" text-white bg-slate-800 hover:bg-slate-600 rounded-lg py-2 px-5 my-5 cursor-pointer">
        <NavLink to={`/admin/jobmanage`}>Quản lý công việc</NavLink>
      </div>
      {/* Quản lý loại công viecj  */}
      <div className=" text-white bg-slate-800 hover:bg-slate-600 rounded-lg py-2 px-5 my-5 cursor-pointer">
        <NavLink to={`/admin/categoriesmanage`}>Quản lý loại công việc</NavLink>
      </div>
      {/* Quản lý chi tiết loại công viecj  */}
      <div className=" text-white bg-slate-800 hover:bg-slate-600 rounded-lg py-2 px-5 my-5 cursor-pointer">
        <NavLink to={`/admin/detailcategoriesmanage`}>
          Quản lý chi tiết loại công việc
        </NavLink>
      </div>
      {/* Quản lý dịch vụ  */}
      <div className=" text-white font-semibold rounded-lg py-2 px-5 my-5 cursor-pointer">
        Quản lý dịch vụ
      </div>
      <div className="px-5">
        <div className="text-white bg-slate-800 hover:bg-slate-600 rounded-lg py-2 px-5 my-5 cursor-pointer">
          <NavLink to={`/admin/commentmanage`}>Quản lý bình luận</NavLink>
        </div>
        <div className=" text-white bg-slate-800 hover:bg-slate-600 rounded-lg py-2 px-5 my-5 cursor-pointer">
          <NavLink to={`/admin/jobretailmanage`}>
            Quản lý thuê công việc
          </NavLink>
        </div>
      </div>
      <div className=" bottom-5 absolute w-[90%] flex flex-wrap justify-between items-center text-white bg-slate-700 rounded-lg py-2 px-5 cursor-pointer ">
        <div>
          <h4 className="text-xxl font-semibold">{userInfor.user.name}</h4>
          <button className="bg-gray-400 py-1 px-4 rounded-lg mr-3 mt-1">
            Edit
          </button>
          <button
            onClick={() => {
              handleLogOut();
            }}
            className="bg-red-700 py-1 px-4 rounded-lg mt-1"
          >
            Log Out
          </button>
        </div>
        <img
          src={userInfor.user.avatar}
          className="w-14 h-14 rounded-full border"
          alt=""
        />
      </div>
    </div>
  );
};

export default Dashboard;
