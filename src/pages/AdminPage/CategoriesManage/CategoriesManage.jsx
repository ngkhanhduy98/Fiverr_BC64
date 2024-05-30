import React, { useEffect, useState } from "react";
import { adminLoaiCongViecSer } from "../../../services/adminLoaiCongViecSer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { Modal } from "antd";

const CategoriesManage = () => {
  const [categoriesData, setCategoriesData] = useState();
  const [categoryDataById, setCategoryDataById] = useState();
  const { userInfor } = useSelector((state) => state.userReducer);
  const [isAddCategoryItemOpen, setIsAddCategoryItemOpen] = useState(false);
  const [isEditCategoryItemOpen, setIsEditCategoryItemOpen] = useState(false);
  const fetchCategoriesData = async () => {
    try {
      let data = await adminLoaiCongViecSer.getLoaiCongViec();
      setCategoriesData(data.data.content);

      console.log(`data`, data.data.content);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);
  const delCategories = async (id) => {
    try {
      const data = await adminLoaiCongViecSer.delLoaiCongViec(
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
      fetchCategoriesData();
    } catch (error) {}
  };
  const getCategoryItemById = async (id) => {
    try {
      const data = await adminLoaiCongViecSer.getLoaiCongViecById(id);
      console.log(`Lay data thanh cong`);
      setCategoryDataById(data.data.content);
      showEditCategoryItemModal();
    } catch (error) {}
  };
  const showAddCategoryItemModal = () => {
    setIsAddCategoryItemOpen(true);
  };
  const showEditCategoryItemModal = () => {
    setIsEditCategoryItemOpen(true);
    // getUserDataById(id);
  };
  const handleEditOK = () => {
    setIsEditCategoryItemOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditCategoryItemOpen(false);
  };
  const handleAddOk = () => {
    setIsAddCategoryItemOpen(false);
  };
  const handleAddCancel = () => {
    setIsAddCategoryItemOpen(false);
  };
  const formAddCategoryItem = useFormik({
    initialValues: {
      id: 0,
      tenLoaiCongViec: "",
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
          setIsAddCategoryItemOpen(false);
          fetchCategoriesData();
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
  const formEditCategoryItem = useFormik({
    initialValues: {
      id: 0,
      tenLoaiCongViec: categoryDataById?.tenLoaiCongViec,
    },
    onSubmit: async (value) => {
      try {
        const data = await adminLoaiCongViecSer.putLoaiCongViecById(
          value,
          categoryDataById.id,
          userInfor.token
        );
        console.log(`Post thành công`, data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Chỉnh sửa thông tin công việc thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsEditCategoryItemOpen(false);
          fetchCategoriesData();
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

  const renderCategoriesList = () => {
    return categoriesData?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.tenLoaiCongViec} </td>
          <td className="px-6 py-4">
            <button
              onClick={() => {
                getCategoryItemById(data.id);
              }}
              className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                delCategories(data.id);
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
        onClick={showAddCategoryItemModal}
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderCategoriesList()}</tbody>
        </table>
      </div>
      <Modal
        title="Add New Category Item"
        open={isAddCategoryItemOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <form action="" onSubmit={formAddCategoryItem.handleSubmit}>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="tenLoaiCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên loại công việc
              </label>
              <input
                onChange={formAddCategoryItem.handleChange}
                type="text"
                id="tenLoaiCongViec"
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
        title="Edit Category Item"
        open={isEditCategoryItemOpen}
        onOk={handleEditOK}
        onCancel={handleEditCancel}
      >
        <form action="" onSubmit={formEditCategoryItem.handleSubmit}>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="tenLoaiCongViec"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên loại công việc
              </label>
              <input
                onChange={formEditCategoryItem.handleChange}
                defaultValue={categoryDataById?.tenLoaiCongViec}
                type="text"
                id="tenLoaiCongViec"
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

export default CategoriesManage;
