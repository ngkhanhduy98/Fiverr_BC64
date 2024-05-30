import React, { useEffect, useState } from "react";
import { adminCongViecSer } from "../../../services/adminCongViecSer";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useFormik } from "formik";

const JobManage = () => {
  const [jobData, setJobData] = useState();
  const [jobDataById, setJobDataByID] = useState();
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const fetchJobData = async () => {
    try {
      let data = await adminCongViecSer.getCongViecData();
      setJobData(data.data.content);
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
  const { userInfor } = useSelector((state) => state.userReducer);
  const getDataCongViecById = async (id) => {
    try {
      const data = await adminCongViecSer.getCongViecById(id);
      console.log(`Data cong viec bt id`, data.data.content);
      setJobDataByID(data.data.content);
      showEditJobModal();
    } catch (error) {}
  };
  const deleteJob = async (id) => {
    try {
      let data = await adminCongViecSer.delCongViec(id, userInfor.token);
      if (data?.data.statusCode == 200) {
        Swal.fire({
          title: "Thành công",
          text: "Công việc đã được xóa",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Thất bại",
        text: error.response.data.content,
        icon: "error",
      });
    }
    fetchJobData();
  };

  useEffect(() => {
    fetchJobData();
  }, []);
  const showAddUserModal = () => {
    setIsAddJobModalOpen(true);
  };
  const showEditJobModal = () => {
    setIsEditJobModalOpen(true);
    // getUserDataById(id);
  };
  const handleEditJobOK = () => {
    setIsEditJobModalOpen(false);
  };
  const handleEditJobCancel = () => {
    setIsEditJobModalOpen(false);
  };
  const handleAddOk = () => {
    setIsAddJobModalOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddJobModalOpen(false);
  };
  const formAddJob = useFormik({
    initialValues: {
      id: 0,
      tenCongViec: "",
      danhGia: 0,
      giaTien: 0,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: 0,
      moTaNgan: "",
      saoCongViec: 0,
    },
    onSubmit: async (value) => {
      try {
        const data = await adminCongViecSer.postCongViec(
          value,
          userInfor.token
        );
        console.log(`Post thành công`, data);
        if (data.data.statusCode == 201) {
          Swal.fire({
            title: "Thành công",
            text: "Công việc mới đã được tạo thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsAddJobModalOpen(false);
          fetchJobData();
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
  const formEditJob = useFormik({
    initialValues: {
      id: 0,
      tenCongViec: jobDataById?.tenCongViec,
      danhGia: jobDataById?.danhGia,
      giaTien: jobDataById?.giaTien,
      nguoiTao: jobDataById?.nguoiTao,
      hinhAnh: jobDataById?.hinhAnh,
      moTa: jobDataById?.moTa,
      maChiTietLoaiCongViec: jobDataById?.maChiTietLoaiCongViec,
      moTaNgan: jobDataById?.moTaNgan,
      saoCongViec: jobDataById?.saoCongViec,
    },
    onSubmit: async (value) => {
      try {
        const data = await adminCongViecSer.putCongViec(
          value,
          jobDataById.id,
          userInfor.token
        );
        console.log(`Put thành công`, data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Thông tin công việc đã được cập nhật",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsEditJobModalOpen(false);
          fetchJobData();
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

  const renderJobList = () => {
    return jobData?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">
            <img src={data.hinhAnh} alt="" />
          </td>
          <td className="px-6 py-4">{data.tenCongViec} </td>
          <td className="px-6 py-4">{data.moTa} </td>
          <td className="px-6 py-4">
            <button
              onClick={() => {
                getDataCongViecById(data.id);
              }}
              className="py-1 px-3 rounded-lg bg-black text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteJob(data.id);
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
      <button
        onClick={showAddUserModal}
        className="bg-green-400 uppercase rounded-xl mb-6 text-white py-2 px-5 font-semibold hover:bg-green-500"
      >
        Add New Job
      </button>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Job Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderJobList()}</tbody>
        </table>
      </div>
      <Modal
        title="Add New Job"
        open={isAddJobModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <form action="" onSubmit={formAddJob.handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="ml-2">
              <label
                htmlFor="tenCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên công việc
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="text"
                id="tenCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="danhGia"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Đánh giá
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="text"
                id="danhGia"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="giaTien"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Giá tiền
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="number"
                id="giaTien"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="nguoiTao"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Người tạo
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="number"
                id="nguoiTao"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="saoCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sao công việc
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="number"
                id="saoCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="maChiTietLoaiCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã chi tiết loại công việc
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="number"
                id="momaChiTietLoaiCongViecTa"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2 col-span-2">
              <label
                htmlFor="hinhAnh"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hình ảnh
              </label>
              <input
                onChange={formAddJob.handleChange}
                type="text"
                id="hinhAnh"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2 col-span-2">
              <label
                htmlFor="moTa"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                rows={4}
                onChange={formAddJob.handleChange}
                type="text"
                id="moTa"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="ml-2 col-span-2 ">
              <label
                htmlFor="moTaNgan"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả ngắn
              </label>
              <textarea
                rows={4}
                onChange={formAddJob.handleChange}
                type="text"
                id="moTaNgan"
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
      <Modal
        title="Edit Job Data"
        open={isEditJobModalOpen}
        onOk={handleEditJobOK}
        onCancel={handleEditJobCancel}
      >
        <form action="" onSubmit={formEditJob.handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="ml-2">
              <label
                htmlFor="tenCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên công việc
              </label>
              <input
                defaultValue={jobDataById?.tenCongViec}
                onChange={formEditJob.handleChange}
                type="text"
                id="tenCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="danhGia"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Đánh giá
              </label>
              <input
                defaultValue={jobDataById?.danhGia}
                onChange={formEditJob.handleChange}
                type="text"
                id="danhGia"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="giaTien"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Giá tiền
              </label>
              <input
                defaultValue={jobDataById?.giaTien}
                onChange={formEditJob.handleChange}
                type="number"
                id="giaTien"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="nguoiTao"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Người tạo
              </label>
              <input
                defaultValue={jobDataById?.nguoiTao}
                onChange={formEditJob.handleChange}
                type="number"
                id="nguoiTao"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="saoCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sao công việc
              </label>
              <input
                defaultValue={jobDataById?.saoCongViec}
                onChange={formEditJob.handleChange}
                type="number"
                id="saoCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="maChiTietLoaiCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã chi tiết loại công việc
              </label>
              <input
                defaultValue={jobDataById?.maChiTietLoaiCongViec}
                onChange={formEditJob.handleChange}
                type="number"
                id="momaChiTietLoaiCongViecTa"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2 col-span-2">
              <label
                htmlFor="hinhAnh"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hình ảnh
              </label>
              <input
                defaultValue={jobDataById?.hinhAnh}
                onChange={formEditJob.handleChange}
                type="text"
                id="hinhAnh"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2 col-span-2">
              <label
                htmlFor="moTa"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                rows={4}
                defaultValue={jobDataById?.moTa}
                onChange={formEditJob.handleChange}
                type="text"
                id="moTa"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="ml-2 col-span-2 ">
              <label
                htmlFor="moTaNgan"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả ngắn
              </label>
              <textarea
                rows={4}
                defaultValue={jobDataById?.moTaNgan}
                onChange={formEditJob.handleChange}
                type="text"
                id="moTaNgan"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg">
            Comfirm
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default JobManage;
