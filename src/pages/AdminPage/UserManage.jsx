import React, { useEffect, useState } from "react";
import { nguoiDungSer } from "../../services/nguoiDungSer";

const UserManage = () => {
  const [userData, setUserData] = useState();
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
  const renderUserList = () => {
    return userData?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.name}</td>
          <td className="px-6 py-4">{data.email} </td>
          <td className="px-6 py-4">{data.role} </td>
          <td className="px-6 py-4">
            <button className="py-1 px-3 rounded-lg bg-black text-white font-semibold">
              Edit
            </button>
            <button className="ml-2 py-1 px-3 rounded-lg bg-red-700 text-white font-semibold">
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
    </div>
  );
};

export default UserManage;
