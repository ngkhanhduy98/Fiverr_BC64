import React, { useEffect, useState } from "react";
import { adminThueCongViecSer } from "../../../../services/adminThueCongViecSer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Modal } from "antd";
import { useFormik } from "formik";

const JobRetailManage = () => {
  const [data, setData] = useState();
  const [dataById, setDataById] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userInfor } = useSelector((state) => state.userReducer);
  const fetchData = async () => {
    try {
      let data = await adminThueCongViecSer.getThueCongViec();
      setData(data.data.content);
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
  const getCongViecThueById = async (id) => {
    try {
      const data = await adminThueCongViecSer.getCongViecThueById(
        id,
        userInfor.token
      );
      setDataById(data.data.content);
      //    id: dataById?.id,
      // maCongViec: dataById?.maCongViec,
      // maNguoiThue: dataById?.maNguoiThue,
      // ngayThue: dataById?.ngayThue,
      // hoanThanh: true,
      formEdit.setFieldValue("id", data.data.content.id);
      formEdit.setFieldValue("maCongViec", data.data.content.maCongViec);
      formEdit.setFieldValue("maNguoiThue", data.data.content.maNguoiThue);
      formEdit.setFieldValue("ngayThue", data.data.content.ngayThue);
      // console.log(`Clg formEdit`, formEdit, data);
      showEditModal();
    } catch (error) {}
  };
  const delCongViecThue = async (id) => {
    const data = await adminThueCongViecSer.delCongViecThue(
      id,
      userInfor.token
    );
    fetchData();
    if (data) {
      Swal.fire({
        title: "Thành công",
        text: "Công việc đã được xóa",
        icon: "success",
      });
    }
  };

  //Sửa thông tin
  const formEdit = useFormik({
    initialValues: {
      id: dataById?.id,
      maCongViec: dataById?.maCongViec,
      maNguoiThue: dataById?.maNguoiThue,
      ngayThue: dataById?.ngayThue,
      hoanThanh: true,
    },
    onSubmit: async (value, { resetForm }) => {
      try {
        const data = await adminThueCongViecSer.putCongViecThueById(
          formEdit.values.id,
          value,
          userInfor.token
        );
        console.log(`Post thành công`, data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Chỉnh sửa thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsEditModalOpen(false);
          fetchData();
          setDataById("");
          console.log(`Da reset`);
        }
      } catch (error) {
        Swal.fire({
          title: "Đăng ký thất bại",
          text: error.response.data.content,
          icon: "error",
        });
      }
    },
  });
  const showEditModal = () => {
    setIsEditModalOpen(true);
    // getUserDataById(id);
  };
  const handleEditOK = () => {
    setIsEditModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderDsCongViecThue = () => {
    return data?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.maCongViec} </td>
          <td className="px-6 py-4">{data.maNguoiThue}</td>
          <td className="px-6 py-4">{data.ngayThue}</td>
          <td className="px-6 py-4">
            <button
              onClick={() => {
                getCongViecThueById(data.id);
              }}
              className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                delCongViecThue(data.id);
              }}
              className=" mt-2 py-1 px-3 rounded-lg bg-red-700 text-white font-semibold"
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
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Job ID
              </th>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Picked Day
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderDsCongViecThue()}</tbody>
        </table>
      </div>
      <Modal
        title="Edit"
        open={isEditModalOpen}
        onOk={handleEditOK}
        onCancel={handleEditCancel}
      >
        <form action="" onSubmit={formEdit.handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="ml-2">
              <label
                htmlFor="id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                id
              </label>
              <input
                disabled
                value={formEdit.values.id}
                onChange={formEdit.handleChange}
                type="text"
                id="id"
                // name="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="maCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã công việc
              </label>
              <input
                onChange={formEdit.handleChange}
                value={formEdit.values.maCongViec}
                type="text"
                id="maCongViec"
                // name="maCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="maNguoiThue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã người thuê
              </label>
              <input
                onChange={formEdit.handleChange}
                type="text"
                value={formEdit.values.maNguoiThue}
                id="maNguoiThue"
                name="maNguoiThue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="ngayThue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ngày thuê
              </label>
              <input
                onChange={formEdit.handleChange}
                value={formEdit.values.ngayThue}
                type="date"
                id="ngayThue"
                name="ngayThue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg">
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default JobRetailManage;
