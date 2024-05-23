import React from "react";
import Dashboard from "../component/Dashboard/Dashboard";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <div className=" grid grid-cols-5">
      <div className=" sticky top-0 left-0">
        <Dashboard></Dashboard>
      </div>
      <div className="col-span-4 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminTemplate;
