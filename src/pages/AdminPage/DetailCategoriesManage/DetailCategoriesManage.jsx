import React, { useEffect, useState } from "react";
import { adminChiTietLoaiCongViecSer } from "../../../services/adminChiTietLoaiCongViec";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const DetailCategoriesManage = () => {
  const { userInfor } = useSelector((state) => state.userReducer);
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
  const [data, setData] = useState();
  const fetchDetailCategoriesData = async () => {
    try {
      let data = await adminChiTietLoaiCongViecSer.getChiTietLoaiCongViec();
      setData(data.data.content);
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
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
            <button className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold">
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
    </div>
  );
};

export default DetailCategoriesManage;
