import React, { useEffect, useState } from "react";
import { adminCongViecSer } from "../../../services/adminCongViecSer";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const JobManage = () => {
  const [jobData, setJobData] = useState();
  const fetchJobData = async () => {
    try {
      let data = await adminCongViecSer.getCongViecData();
      setJobData(data.data.content);
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
  const { userInfor } = useSelector((state) => state.userReducer);

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
  const renderUserList = () => {
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
            <button className="py-1 px-3 rounded-lg bg-black text-white font-semibold">
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
          <tbody>{renderUserList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default JobManage;
