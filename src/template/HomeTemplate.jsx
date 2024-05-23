import React from "react";
import { Outlet } from "react-router-dom";
import IndexHeader from "../component/Header/IndexHeader";
import TemplateFooter from "../component/Footer/footer";
const HomeTemplate = () => {
  return (
    <div>
      <IndexHeader></IndexHeader>
      <Outlet />
      <TemplateFooter></TemplateFooter>
    </div>
  );
};

export default HomeTemplate;
