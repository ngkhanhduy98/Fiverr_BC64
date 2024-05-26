import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { congViecSer } from "../../services/congViecSer";

const Works = () => {
  const [congViec, setCongViec] = useState();
  console.log("🤪 ~ Works ~ congViec:", congViec);
  const { idNhomCongViec } = useParams();
  console.log("🤪 ~ Works ~ idNhomCongViec:", idNhomCongViec);
  const fetchDanhSachCongViec = async () => {
    try {
      let data = await congViecSer.congViecTheoChiTietLoai(idNhomCongViec);
      console.log("🤪 ~ fetchDanhSachCongViec ~ data:", data);
      setCongViec(data.data.content);
    } catch (error) {}
  };
  useEffect(() => {
    fetchDanhSachCongViec();
  }, [idNhomCongViec]);
  const renderItem = () => {
    return congViec?.map((data, i) => {
      return (
        <div className="p-4" key={i}>
          <div className="border">
            <img src={data.congViec.hinhAnh} alt="" className="w-full h-auto" />
            <div className="flex flex-wrap items-center my-3">
              <img
                src={data.avatar}
                alt=""
                className="w-6 h-6 object-cover rounded-full mx-4"
              />
              <div className="">
                <h3 className="text-sm font-semibold">{data.tenNguoiTao}</h3>
                <p className="text-sm font-semibold text-gray-400">
                  Level 2 Seller
                </p>
              </div>
            </div>
            <p className="mx-3 my-5 text-base text-gray-500 hover:text-green-500 cursor-pointer duration-300">
              <NavLink to={`/works/detail/${data.congViec.id}`}>
                {data.congViec.tenCongViec}
              </NavLink>
            </p>
            <span className="font-semibold pb-3 text-sm text-yellow-400 flex flex-wrap items-center mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1792 1792"
                width={15}
                height={15}
                className="mr-1"
              >
                <path
                  fill="#ffbe5b"
                  d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                />
              </svg>
              {data.congViec.saoCongViec}{" "}
              <span className="text-gray-400 ml-3">
                {`(` + data.congViec.danhGia + `)`}
              </span>
            </span>
            <hr />
            <div className="flex flex-wrap items-center justify-between px-2">
              <span>
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" />
                </svg>
              </span>
              <p className="font-semibold text-gray-400">
                STARTING AT
                <span className="text-xl text-gray-500">
                  {" "}
                  US${data.congViec.giaTien}
                </span>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderChiTietLoai = () => {
    if (congViec?.length > 0) {
      return <span>Result for "{congViec[0].tenChiTietLoai}"</span>;
    } else {
      return <span>Không tìm thấy công việc phù hợp</span>;
    }
  };
  return (
    <div className="xl:max-w-[1400px] mx-auto max-w-[96%] my-2 items-center">
      {/* Data cunng cho no do trong  */}
      <h3 className="text-2xl mt-8 font-semibold">{renderChiTietLoai()}</h3>
      <div className=" flex flex-wrap items-center mt-3 justify-between">
        {/* group left  */}
        <div className="flex flex-wrap items-center">
          <div className="bg-gray-50 border border-gray-400 mr-2 hover:border-gray-700 cursor-pointer rounded-lg flex flex-wrap items-center px-3 py-1">
            <span className="font-semibold mr-3">Services option</span>
            <svg
              width={14}
              height={14}
              viewBox="0 0 11 7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentFill"
            >
              <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z" />
            </svg>
          </div>
          <div className="bg-gray-50 border border-gray-400 mr-2 hover:border-gray-700 cursor-pointer rounded-lg flex flex-wrap items-center px-3 py-1">
            <span className="font-semibold mr-3">Seller detail</span>
            <svg
              width={14}
              height={14}
              viewBox="0 0 11 7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentFill"
            >
              <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z" />
            </svg>
          </div>
          <div className="bg-gray-50 border border-gray-400 mr-2 hover:border-gray-700 cursor-pointer rounded-lg flex flex-wrap items-center px-3 py-1">
            <span className="font-semibold mr-3">Budget</span>
            <svg
              width={14}
              height={14}
              viewBox="0 0 11 7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentFill"
            >
              <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z" />
            </svg>
          </div>
          <div className="bg-gray-50 border border-gray-400 mr-2 hover:border-gray-700 cursor-pointer rounded-lg flex flex-wrap items-center px-3 py-1">
            <span className="font-semibold mr-3">Delivery time</span>
            <svg
              width={14}
              height={14}
              viewBox="0 0 11 7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentFill"
            >
              <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z" />
            </svg>
          </div>
        </div>
        {/* group right  */}
        <div className="flex flex-wrap items-center">
          <div className="py-1">
            <span className="font-semibold text-gray-400 mr-7">
              Pro services
            </span>
          </div>
          <div className="">
            <span className="font-semibold text-gray-400 mr-7">
              Local seller
            </span>
          </div>
          <div className="">
            <span className="font-semibold text-gray-400 mr-7">
              Online Seller
            </span>
          </div>
        </div>
      </div>
      {/* Toi khuc nhet code vo roi ne  */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
        {renderItem()}
      </div>
    </div>
  );
};

export default Works;
