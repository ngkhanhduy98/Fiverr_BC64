import { DatePicker } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { authSer } from "../../services/authSer";

const RegisterPage = () => {
  const [userBirthday, setBirthDay] = useState();
  console.log("🤪 ~ RegisterPage ~ userBirthday:", userBirthday);
  const onChange = (date, dateString) => {
    setBirthDay(dateString);
  };
  const navigate = useNavigate();
  const formLogin = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "USER",
      skill: [""],
      certification: [""],
    },
    onSubmit: async (value) => {
      value.birthday = userBirthday;
      try {
        const promise = await authSer.postSignup(value);
        console.log(promise);
        if (promise.data.statusCode == 200) {
          Swal.fire({
            title: "Đăng ký thành công",
            text: "Bạn sẽ được chuyển về trang đăng nhập",
            icon: "success",
          });
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } catch (error) {
        Swal.fire({
          title: "Đăng ký thất bại",
          text: error.response.data.content,
          icon: "error",
        });
      }
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(4, "mật khẩu ít phải là 4 chữ cái"),
      email: yup
        .string()
        .required("email không được để trống")
        .email("Email không hợp lệ"),
      phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/^0\d{9,10}$/, "Số điện thoại không đúng định dạng"),
      name: yup
        .string()
        .required("Tên không được để trống không được để trống"),
    }),
  });
  return (
    <div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Đăng ký tài khoản của bạn
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={formLogin.handleSubmit}
          action=""
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              onChange={formLogin.handleChange}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
              {formLogin.errors.email}
            </p>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Số đện thoại
            </label>
            <input
              onChange={formLogin.handleChange}
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
              {formLogin.errors.phone}
            </p>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Họ và tên
            </label>
            <input
              onChange={formLogin.handleChange}
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
              {formLogin.errors.name}
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu
            </label>
            <input
              onChange={formLogin.handleChange}
              name="password"
              id="password"
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
              {formLogin.errors.password}
            </p>
          </div>
          <div>
            <label
              htmlFor="ngaySinh"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ngày sinh
            </label>
            <DatePicker
              id="ngaySinh"
              className="g-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Đăng ký
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Đã có tài khoản?
            <NavLink
              to={"/auth/login"}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Đăng nhập
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
