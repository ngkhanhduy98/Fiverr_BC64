import React, { useEffect, useState } from "react";
import { nguoiDungSer } from "../../services/nguoiDungSer";
import Swal from "sweetalert2";
import { Modal } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const UserManage = () => {
  const [userData, setUserData] = useState();
  const [userDataByID, setUserDatabyId] = useState();
  const navigate = useNavigate();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const getUserDataById = async (id) => {
    try {
      const data = await nguoiDungSer.getUserByID(id);
      console.log(`USerDataByID`, data.data.content);
      setUserDatabyId(data.data.content);
      //   id: 0,
      // name: "",
      // email: "",
      // password: "",
      // phone: "",
      // birthday: "",
      // gender: true,
      // role: "",
      formEditUser.setFieldValue("id", data.data.content.id);
      formEditUser.setFieldValue("name", data.data.content.name);
      formEditUser.setFieldValue("email", data.data.content.email);
      formEditUser.setFieldValue("password", data.data.content.password);
      formEditUser.setFieldValue("phone", data.data.content.phone);
      formEditUser.setFieldValue("birthday", data.data.content.birthday);
      formEditUser.setFieldValue("role", data.data.content.role);
      showEditUserModal();
    } catch (error) {}
  };
  const delUser = async (id) => {
    const data = await nguoiDungSer.delUser(id);
    if (data.data.statusCode == 200) {
      Swal.fire({
        title: "Thành công",
        text: "Người dùng đã được xóa",
        icon: "success",
      });
    }
    fetchUserData();
  };
  const fetchUserData = async () => {
    try {
      let data = await nguoiDungSer.getUsers();
      console.log("🤪 ~ fetchUserData ~ data:", data);

      setUserData(data.data.content);
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const showAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };
  const showEditUserModal = () => {
    setIsEditUserModalOpen(true);
    // getUserDataById(id);
  };
  const handleEditOK = () => {
    setIsEditUserModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditUserModalOpen(false);
  };
  const handleAddOk = () => {
    setIsAddUserModalOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddUserModalOpen(false);
  };
  const formAddUser = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "ADMIN",
      skill: [""],
      certification: [""],
    },
    onSubmit: async (value) => {
      try {
        const data = await nguoiDungSer.postUser(value);
        console.log(data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "User đã được tạo thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsAddUserModalOpen(false);
          fetchUserData();
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
  const formEditUser = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
      skill: [""],
      certification: [""],
    },
    onSubmit: async (value) => {
      try {
        console.log(userDataByID.id);
        const data = await nguoiDungSer.putUserData(value, userDataByID.id);
        console.log(data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Thông tin user đã được thay đổi thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsEditUserModalOpen(false);
          fetchUserData();
        }
      } catch (error) {
        Swal.fire({
          title: "Thất bại",
          text: "Chỉnh sửa thông tin user không thành công",
          text: error.response.data.content,
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },
  });
  const renderUserList = () => {
    return userData?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.name}</td>
          <td className="px-6 py-4">{data.email} </td>
          <td className="px-6 py-4">{data.role} </td>
          <td className="px-6 py-4">
            <button
              onClick={() => {
                getUserDataById(data.id);
              }}
              className="py-1 px-3 rounded-lg bg-black text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                delUser(data.id);
              }}
              className="ml-2 py-1 px-3 rounded-lg bg-red-700 text-white font-semibold"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <button
        onClick={showAddUserModal}
        className="bg-green-400 uppercase rounded-xl mb-6 text-white py-2 px-5 font-semibold hover:bg-green-500"
      >
        Add user
      </button>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderUserList()}</tbody>
        </table>
      </div>
      <Modal
        title="Add ADMIN"
        open={isAddUserModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <form action="" onSubmit={formAddUser.handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="ml-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                onChange={formAddUser.handleChange}
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
                {formAddUser.errors.email}
              </p>
            </div>
            <div className="ml-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                onChange={formAddUser.handleChange}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
                {formAddUser.errors.name}
              </p>
            </div>
            <div className="ml-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                onChange={formAddUser.handleChange}
                type="text"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
                {formAddUser.errors.phone}
              </p>
            </div>
            <div className="ml-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                onChange={formAddUser.handleChange}
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
                {formAddUser.errors.password}
              </p>
            </div>
            <div className="ml-2">
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Birthday
              </label>
              <input
                onChange={formAddUser.handleChange}
                type="date"
                id="birthday"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className=" ml-2">
              <label htmlFor="">Gender</label>
              <div className="flex flex-wrap space-x-5 mt-4">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Men
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    defaultChecked
                    id="default-radio-2"
                    type="radio"
                    value
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg">
            Add
          </button>
        </form>
      </Modal>
      <Modal
        title="Edit your profile"
        open={isEditUserModalOpen}
        onOk={handleEditOK}
        onCancel={handleEditCancel}
      >
        <form action="" onSubmit={formEditUser.handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="ml-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                onChange={formEditUser.handleChange}
                type="text"
                id="email"
                value={formEditUser.values.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p className=" mt-1 ml-3 text-red-500 text-xs font-mono h-4">
                {formEditUser.errors.email}
              </p>
            </div>
            <div className="ml-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                onChange={formEditUser.handleChange}
                value={formEditUser.values.name}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                onChange={formEditUser.handleChange}
                type="text"
                id="phone"
                value={formEditUser.values.phone}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                onChange={formEditUser.handleChange}
                type="text"
                id="password"
                value={formEditUser.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Birthday
              </label>
              <input
                onChange={formEditUser.handleChange}
                type="date"
                id="birthday"
                value={formEditUser.values.birthday}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <input
                onChange={formEditUser.handleChange}
                type="text"
                id="role"
                value={formEditUser.values.role}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {/* <div className=" ml-2">
              <label htmlFor="">Gender</label>
              <div className="flex flex-wrap space-x-5 mt-4">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                   value
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Men
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    defaultChecked
                    id="default-radio-2"
                    type="radio"
                   value
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          <button className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg">
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserManage;
