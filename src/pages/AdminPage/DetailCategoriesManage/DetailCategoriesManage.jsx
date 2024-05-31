import React, { useEffect, useState } from "react";
import { adminChiTietLoaiCongViecSer } from "../../../services/adminChiTietLoaiCongViec";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { Modal } from "antd";
import { adminLoaiCongViecSer } from "../../../services/adminLoaiCongViecSer";

const DetailCategoriesManage = () => {
  const { userInfor } = useSelector((state) => state.userReducer);
  const [isAddDetailCategoryItemOpen, setIsAddDetailCategoryItemOpen] =
    useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [isEditGroupItemOpen, setIsEdiGroupItemOpen] = useState(false);
  const delDetailCategories = async (id) => {
    try {
      const data = await adminChiTietLoaiCongViecSer.delChiTietLoaiCongViec(
        id,
        userInfor.token
      );
      if (data.data.statusCode == 200) {
        Swal.fire({
          title: "Thành công",
          text: "Bình luận của bạn đã được xóa",
          icon: "success",
        });
      }
      fetchDetailCategoriesData();
    } catch (error) {}
  };
  const [subData, setSubData] = useState();
  const [data, setData] = useState();
  const getGroupDataById = async (id) => {
    try {
      const data = await adminChiTietLoaiCongViecSer.getChiTietLoaiCongViecById(
        id
      );
      console.log(`group data`, data.data.content);
      //       id: 0,
      // tenChiTiet: "",
      // maLoaiCongViec: 0,
      // danhSachChiTiet: [],
      formEditGroup.setFieldValue("id", data.data.content.id);
      formEditGroup.setFieldValue("tenNhom", data.data.content.tenNhom);
      formEditGroup.setFieldValue("hinhAnh", data.data.content.hinhAnh);
      formEditGroup.setFieldValue(
        "maLoaiCongViec",
        data.data.content.maLoaiCongViec
      );
      setIsEdiGroupItemOpen(true);
    } catch (error) {}
  };
  const fetchDetailCategoriesData = async () => {
    try {
      let subData = await adminLoaiCongViecSer.getLoaiCongViec();
      let data = await adminChiTietLoaiCongViecSer.getChiTietLoaiCongViec();
      setData(data.data.content);
      setSubData(subData.data.content);
      console.log(
        "🤪 ~ fetchDetailCategoriesData ~ subData:",
        subData.data.content
      );
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
  const renderCategoriesList = () => {
    return subData?.map((data, i) => {
      return (
        <option key={i} value={data.id}>
          {data.tenLoaiCongViec}
        </option>
      );
    });
  };

  const showAddDetailCategoryItemModal = () => {
    setIsAddDetailCategoryItemOpen(true);
  };

  const handleAddOk = () => {
    setIsAddDetailCategoryItemOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddDetailCategoryItemOpen(false);
  };
  const showAddGroupModal = () => {
    setIsAddGroupModalOpen(true);
  };

  const handleAddGroupOk = () => {
    setIsAddGroupModalOpen(false);
  };
  const handleAddGroupCancel = () => {
    setIsAddGroupModalOpen(false);
  };
  const showEditGroupItem = () => {
    setIsEdiGroupItemOpen(true);
    // getUserDataById(id);
  };
  const handleEditOK = () => {
    setIsEdiGroupItemOpen(false);
  };
  const handleEditCancel = () => {
    setIsEdiGroupItemOpen(false);
  };
  const formEditGroup = useFormik({
    initialValues: {
      id: 0,
      tenChiTiet: "",
      maLoaiCongViec: 0,
      danhSachChiTiet: [],
    },
    onSubmit: async (value) => {
      try {
        const data = await adminLoaiCongViecSer.postLoaiCongViec(
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
          // setIsAddDetailCategoryItemOpen(false);
          // fetchCategoriesData();
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

  const formAddGroupItem = useFormik({
    initialValues: {
      id: 0,
      tenChiTiet: "",
      maLoaiCongViec: 0,
      danhSachChiTiet: [0],
    },
    onSubmit: async (value) => {
      try {
        const data = await adminChiTietLoaiCongViecSer.postNhomChiTietLoai(
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
          setIsAddDetailCategoryItemOpen(false);
          fetchDetailCategoriesData();
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
  const formAddDetailCategoryItem = useFormik({
    initialValues: {
      id: 0,
      tenChiTiet: "",
    },
    onSubmit: async (value) => {
      try {
        const data = await adminChiTietLoaiCongViecSer.postChiTietLoaiCongViec(
          value,
          userInfor.token
        );
        console.log(`Post thành công`, data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Công việc mới đã được tạo thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsAddDetailCategoryItemOpen(false);
          fetchDetailCategoriesData();
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
  // const formEditGroup = useFormik({
  //   initialValues: {
  //     id: 0,
  //     tenLoaiCongViec: formEditGroup.values.tenLoaiCongViec,
  //   },
  //   onSubmit: async (value) => {
  //     try {
  //       const data = await adminChiTietLoaiCongViecSer.putLoaiCongViecById(
  //         value,
  //         formEditGroup.valuesid,
  //         userInfor.token
  //       );
  //       console.log(`Post thành công`, data);
  //       if (data.data.statusCode == 200) {
  //         Swal.fire({
  //           title: "Thành công",
  //           text: "Chỉnh sửa thông tin công việc thành công",
  //           icon: "success",
  //           timer: 2000,
  //           timerProgressBar: true,
  //         });
  //         setIsEditCategoryItemOpen(false);
  //         fetchCategoriesData();
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         title: "Đăng ký thất bại",
  //         text: error.response.data.content,
  //         icon: "error",
  //       });
  //     }
  //   },
  // });
  useEffect(() => {
    fetchDetailCategoriesData();
  }, []);
  const renderDetailCategoriesList = () => {
    return data?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.tenNhom} </td>
          <td className="px-6 py-4">
            <img className="w-40" src={data.hinhAnh} alt="" />{" "}
          </td>
          <td className="px-6 py-4">{data.maLoaiCongviec}</td>
          <td className="px-6 py-4">
            <button
              onClick={(params) => {
                getGroupDataById(data.id);
              }}
              className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                delDetailCategories(data.id);
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
        onClick={showAddDetailCategoryItemModal}
        className="bg-green-400 uppercase rounded-xl mb-6 text-white py-2 px-5 font-semibold hover:bg-green-500"
      >
        Add Item
      </button>
      <button
        onClick={showAddGroupModal}
        className="ml-5 bg-green-400 uppercase rounded-xl mb-6 text-white py-2 px-5 font-semibold hover:bg-green-500"
      >
        Add Group
      </button>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Type ID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderDetailCategoriesList()}</tbody>
        </table>
      </div>
      <Modal
        title="Add New Detail Category Item"
        open={isAddDetailCategoryItemOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <form action="" onSubmit={formAddDetailCategoryItem.handleSubmit}>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="tenChiTiet"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên chi tiết loại công việc
              </label>
              <input
                onChange={formAddDetailCategoryItem.handleChange}
                type="text"
                id="tenChiTiet"
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
        title="Add New Group Category Item"
        open={isAddGroupModalOpen}
        onOk={handleAddGroupOk}
        onCancel={handleAddGroupCancel}
      >
        <form action="" onSubmit={formAddGroupItem.handleSubmit}>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="tenChiTiet"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên chi tiết loại công việc
              </label>
              <input
                onChange={formAddGroupItem.handleChange}
                type="text"
                id="tenChiTiet"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="maLoaiCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã loại công việc
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="maLoaiCongViec"
                name="maLoaiCongViec"
                onChange={formAddGroupItem.handleChange}
                value={1}
              >
                {renderCategoriesList()}
              </select>
              {/* <input
                onChange={formAddGroupItem.handleChange}
                type="text"
                id="maLoaiCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              /> */}
            </div>
          </div>
          <button className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg">
            Add
          </button>
        </form>
      </Modal>
      <Modal
        title="Edit Group Item"
        open={isEditGroupItemOpen}
        onOk={handleEditOK}
        onCancel={handleEditCancel}
      >
        <form action="" onSubmit={formEditGroup.handleSubmit}>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                id
              </label>
              <input
                disabled
                onChange={formEditGroup.handleChange}
                value={formEditGroup.values.id}
                type="text"
                id="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="ml-2">
              <label
                htmlFor="tenNhom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên chi tiết
              </label>
              <input
                onChange={formEditGroup.handleChange}
                value={formEditGroup.values.tenNhom}
                type="text"
                id="tenNhom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="hinhAnh"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hình Ảnh
              </label>
              <input
                disabled
                onChange={formEditGroup.handleChange}
                value={formEditGroup.values.hinhAnh}
                type="text"
                id="hinhAnh"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="ml-2">
              <label
                htmlFor="maLoiCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã loại công việc
              </label>
              <input
                onChange={formEditGroup.handleChange}
                value={formEditGroup.values.maLoiCongViec}
                type="text"
                id="maLoiCongViec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg">
            Confirm
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DetailCategoriesManage;
