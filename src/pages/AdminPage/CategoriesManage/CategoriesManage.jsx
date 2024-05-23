import React, { useEffect, useState } from "react";
import { adminLoaiCongViecSer } from "../../../services/adminLoaiCongViecSer";

const CategoriesManage = () => {
  const [categoriesData, setCategoriesData] = useState();
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
  const renderCategoriesList = () => {
    return categoriesData?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.tenLoaiCongViec} </td>
          <td className="px-6 py-4">
            <button className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold">
              Edit
            </button>
            <button className=" mt-2 py-1 px-3 rounded-lg bg-red-700 text-white font-semibold">
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderCategoriesList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManage;