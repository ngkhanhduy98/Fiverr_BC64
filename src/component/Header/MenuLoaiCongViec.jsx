import React, { useEffect, useState } from "react";
import { congViecSer } from "../../services/congViecSer";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { hover } from "@testing-library/user-event/dist/hover";

const MenuLoaiCongViec = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  const [dataMenu, setDataMenu] = useState();
  const [dropDownItem, setDropDownItem] = useState();
  const navigate = useNavigate();
  const fetchMenu = async () => {
    try {
      let data = await congViecSer.menuLoaiCongViec();
      setDataMenu(data.data.content);
      console.log(`clgdata`, data.data.content);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMenu();
  }, []);
  const renderMenuList = (dataMenu) => {
    return dataMenu?.map((menuItem, i) => {
      return (
        <Dropdown
          key={i}
          menu={{ items: renderSubMenu(menuItem.dsNhomChiTietLoai) }}
        >
          <a
            key={i}
            className="px-3 hover:text-green-400 cursor-pointer"
            onClick={() => {
              navigate(`/categories/${menuItem.id}`);
            }}
          >
            {menuItem.tenLoaiCongViec}
          </a>
        </Dropdown>

        // <li key={i}>
        //   <button
        //     id="dropdownHoverButton"
        //     data-dropdown-toggle={"dropdownNavbar" + i}
        //     data-dropdown-trigger="hover"
        //     className="justify-center w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        //     type="button"
        // onClick={() => {
        //   navigate(`/categories/${menuItem.id}`);
        // }}
        //   >
        //     {/* <NavLink to={`/categories/${menuItem.id}`}> */}
        //
        //     {/* </NavLink> */}
        //   </button>
        //   {/* Dropdown menu */}

        //   <div
        //     id={"dropdownNavbar" + i}
        //     className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600"
        //   >
        //     <ul
        //       className="py-2 text-sm text-gray-700 dark:text-gray-400"
        //       aria-labelledby="dropdownLargeButton"
        //     >
        //       {renderSubMenu(menuItem.dsNhomChiTietLoai)}
        //     </ul>
        //   </div>
        // </li>
      );
    });
  };
  const renderSubMenu = (dataSubmenu) => {
    return dataSubmenu?.map((submenuItem, i) => {
      return {
        key: i,
        label: (
          <li key={i} className="block px-4 py-2 ">
            <span className="text-black">{submenuItem?.tenNhom}</span>
            <ul className="ml-3 text-gray-400 cursor-pointer">
              {renderCongViecTheoNhom(submenuItem.dsChiTietLoai)}
            </ul>
          </li>
        ),
      };
    });
  };
  const renderCongViecTheoNhom = (dataRender) => {
    return dataRender?.map((item, i) => {
      return (
        <li
          key={i}
          className="hover:text-green-400 text-gray-500 rounded-lg py-1 px-2"
        >
          <NavLink className="hover:text-green-400" to={`/works/${item.id}`}>
            {item.tenChiTiet}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <div className="border-t border-b">
      <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-2 items-center">
        <ul className="flex flex-wrap items-center justify-between">
          {renderMenuList(dataMenu)}
        </ul>
      </div>
    </div>
  );
};

export default MenuLoaiCongViec;
