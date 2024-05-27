import React, { useEffect, useState } from "react";
import { adminThueCongViecSer } from "../../../../services/adminThueCongViecSer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const JobRetailManage = () => {
  const [data, setData] = useState();
  const { userInfor } = useSelector((state) => state.userReducer);
  const fetchData = async () => {
    try {
      let data = await adminThueCongViecSer.getThueCongViec();
      setData(data.data.content);
      console.log(`data`, data.data.content);
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
            <button className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold">
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
    </div>
  );
};

export default JobRetailManage;
