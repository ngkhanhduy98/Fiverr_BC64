import React, { useEffect, useState } from "react";
import categoriesBanner from "../../asset/image/categoriesBanner.webp";
import { NavLink, useParams } from "react-router-dom";
import { congViecSer } from "../../services/congViecSer";
const Caregories = () => {
  const { idLoaiCongViec } = useParams();
  const [dsCongViecTheoLoai, setDsCongViecTheoLoai] = useState();
  const [dsNhom, setDsNhom] = useState();

  const fetchDsLoaiCongViec = async () => {
    try {
      let data = await congViecSer.chiTietLoaiCongViec(idLoaiCongViec);
      setDsCongViecTheoLoai(data.data.content[0]);
      setDsNhom(data.data.content[0].dsNhomChiTietLoai);
    } catch (error) {}
  };
  useEffect(() => {
    fetchDsLoaiCongViec();
  }, [idLoaiCongViec]);
  const renderDanhSachLoaiCongViec = () => {
    return dsNhom?.map((data, i) => {
      return (
        <div className="p-4" key={i}>
          <img src={data.hinhAnh} alt="" className="rounded-xl w-full h-auto" />
          <h4 className="text-2xl mt-2">{data.tenNhom}</h4>
          <ul className="mt-3">{renderChiTietLoai(data.dsChiTietLoai)}</ul>
        </div>
      );
    });
  };
  const renderChiTietLoai = (data) => {
    return data?.map((item, i) => {
      return (
        <li
          key={i}
          className="rounded-md text-gray-400 hover:bg-gray-100 py-2 px-4 cursor-pointer "
        >
          <NavLink to={`/works/${item.id}`}>{item.tenChiTiet}</NavLink>
        </li>
      );
    });
  };
  return (
    <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-10">
      <div className="relative">
        <img src={categoriesBanner} alt="" className="rounded-xl" />
        <div className="hidden xl:block md:absolute  top-1/4 left-1/2 -translate-x-1/2">
          <h3 className="text-center font-semibold text-3xl text-white">
            {dsCongViecTheoLoai?.tenLoaiCongViec}
          </h3>
          <p className="text-2xl text-center text-white">
            Bring your story to life with creative videos.
          </p>
          <p className="mx-auto duration-300 w-fit justify-center border flex flex-wrap items-center mt-4 p-3 rounded-md text-white cursor-pointer hover:bg-white hover:text-black">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="circle-play"
              className="svg-inline--fa fa-circle-play w-5 h-5 mr-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg
            >
              <path
                fill="currentColor"
                d="M188.3 147.1C195.8 142.8 205.1 142.1 212.5 147.5L356.5 235.5C363.6 239.9 368 247.6 368 256C368 264.4 363.6 272.1 356.5 276.5L212.5 364.5C205.1 369 195.8 369.2 188.3 364.9C180.7 360.7 176 352.7 176 344V167.1C176 159.3 180.7 151.3 188.3 147.1V147.1zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
              />
            </svg>
            How Fiverr Works
          </p>
        </div>
      </div>
      {/* Khuc nay chua noi dung */}
      <div className="mt-10 border-t pt-3">
        <span className="text-sm font-semibold  text-gray-400">
          {dsCongViecTheoLoai?.dsNhomChiTietLoai.length} services available
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 mt-5">
          {renderDanhSachLoaiCongViec()}
        </div>
      </div>
      {/* Khucs nayf data cunwgs cho no do trong :)))  */}
      <div>
        <h3 className="text-center text-2xl font-bold">
          Services Related To Digital Marketing
        </h3>
        <div className="flex flex-wrap items-center justify-center mt-3">
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Minimalist logo design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Signature logo design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Mascot logo design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            3d logo design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Hand drawn logo design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Vintage logo design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Remove background
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Photo restoration
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Photo retouching
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Image resize
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Product label design
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Custom twitch overlay
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Custom twitch emotes
          </span>
          <span className="bg-gray-200 cursor-pointer hover:text-gray-700 hover:shadow-md text-gray-500 py-1 px-4 rounded-full ml-5 mt-5 duration-300">
            Gaming logo
          </span>
        </div>
      </div>
    </div>
  );
};

export default Caregories;
