import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { congViecSer } from "../../services/congViecSer";
import DetailComment from "./DetailComment/DetailComment";
import { useSelector } from "react-redux";
import { thueCongViecSer } from "../../services/thueCongViecSer";
import Swal from "sweetalert2";

const WorkDetail = () => {
  const { idCongViec } = useParams();
  const navigate = useNavigate();
  const [congViecChiTiet, setCongViecChiTiet] = useState();
  const { userInfor } = useSelector((state) => {
    return state.userReducer;
  });
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
  const thueViec = async () => {
    if (userInfor) {
      try {
        const promise = await thueCongViecSer.postThueCongViec(
          {
            id: 0,
            maCongViec: idCongViec,
            maNguoiThue: userInfor.user.id,
            ngayThue: today,
            hoanThanh: true,
          },
          userInfor.token
        );
        console.log("🤪 ~ thueViec ~ promise:", promise);

        if (promise.data.statusCode == 201) {
          Swal.fire({
            title: "Thành công",
            text: "Bạn đã thuê công việc này",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate("/profile");
          });
        }
      } catch (error) {}
    } else {
      Swal.fire({
        title: "Thất bại",
        text: "Bạn cần phải đăng nhập để sử dụng chức năng này",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };
  const fetchChiTietCongViec = async () => {
    try {
      let data = await congViecSer.congViecChiTiet(idCongViec);
      console.log("🤪 ~ fetchChiTietCongViec ~ data:", data.data.content[0]);
      setCongViecChiTiet(data.data.content[0]);
    } catch (error) {}
  };
  useEffect(() => {
    fetchChiTietCongViec();
  }, []);
  return (
    <div className="xl:max-w-[1200px] mx-auto max-w-[96%] grid grid-cols-3">
      <div className="col-span-3 xl:col-span-2 xl:pr-20">
        <h3 className="text-3xl font-bold py-4">
          {congViecChiTiet?.congViec.tenCongViec}
        </h3>
        <div className="flex flex-wrap items-center">
          <img
            src={congViecChiTiet?.avatar}
            alt=""
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="mr-3 font-semibold">
            {congViecChiTiet?.tenNguoiTao}
          </span>
          <span className="pr-3 border-r text-gray-400">Level 2 seller</span>
          <span className="flex flex-wrap items-center pl-2">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="star"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="mx-1 fill-yellow-300"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
            </svg>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="star"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="mx-1 fill-yellow-300"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
            </svg>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="star"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="mx-1 fill-yellow-300"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
            </svg>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="star"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="mx-1 fill-gray-300"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
            </svg>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="star"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              className="mx-1 fill-gray-300"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
            </svg>
            <span className="font-bold text-yellow-300">
              {congViecChiTiet?.congViec.saoCongViec}
            </span>
          </span>
          <span className="text-gray-400 font-semibold ml-4 border-r pr-3">
            ({congViecChiTiet?.congViec.danhGia})
          </span>
          <span className="text-gray-400 pl-2">2 Order in Queue</span>
        </div>
        <img
          src={congViecChiTiet?.congViec.hinhAnh}
          className="w-full h-auto object-cover py-4"
          alt=""
        />
        {/* Khuc nay toi phan content  */}
        <div>
          <h4 className="text-2xl font-semibold my-5 cals">About this Gig</h4>
          <p className="text-xl font-light">{congViecChiTiet?.congViec.moTa}</p>
        </div>
        <hr className="my-4" />
        <h4 className="text-2xl font-semibold">About The Seller</h4>
        <div className="flex flex-wrap items-center my-3">
          <img
            src="http://sc04.alicdn.com/kf/Hc3e61591078043e09dba7808a6be5d21n.jpg"
            alt=""
            className="w-20 h-20 mx-4 object-cover rounded-full"
          />
          <div className="text-xl">
            <h5 className="font-semibold cursor-pointer">
              {congViecChiTiet?.tenNguoiTao}
            </h5>
            <p className="text-gray-400">{congViecChiTiet?.tenChiTietLoai}</p>
            <div className="flex flex-wrap items-center">
              <span className="flex flex-wrap items-center">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="star"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mx-1 fill-yellow-300"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                </svg>
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="star"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mx-1 fill-yellow-300"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                </svg>
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="star"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mx-1 fill-yellow-300"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                </svg>
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="star"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mx-1 fill-gray-300"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                </svg>
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="star"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mx-1 fill-gray-300"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                </svg>
                <span className="font-bold text-yellow-300">
                  {congViecChiTiet?.congViec.saoCongViec}
                </span>
              </span>
              <span className="text-gray-400 font-semibold ml-4">
                ({congViecChiTiet?.congViec.danhGia})
              </span>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-semibold my-5">FAQ</h3>
        <div className="flex text-gray-500 my-4 flex-wrap items-center justify-between cursor-pointer">
          <p className="text-xl font-semibold">
            There are many passages but the majority?
          </p>
          <svg
            className="rotate-90"
            width={8}
            height={16}
            viewBox="0 0 8 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
          </svg>
        </div>
        <div className="flex text-gray-500 my-4 flex-wrap items-center justify-between cursor-pointer">
          <p className="text-xl font-semibold">
            There are many passages but the majority?
          </p>
          <svg
            className="rotate-90"
            width={8}
            height={16}
            viewBox="0 0 8 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
          </svg>
        </div>
        <div className="flex text-gray-500 my-4 flex-wrap items-center justify-between cursor-pointer">
          <p className="text-xl font-semibold">
            There are many passages but the majority?
          </p>
          <svg
            className="rotate-90"
            width={8}
            height={16}
            viewBox="0 0 8 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
          </svg>
        </div>
        <div className="flex text-gray-500 my-4 flex-wrap items-center justify-between cursor-pointer">
          <p className="text-xl font-semibold">
            There are many passages but the majority?
          </p>
          <svg
            className="rotate-90"
            width={8}
            height={16}
            viewBox="0 0 8 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
          </svg>
        </div>
        <DetailComment></DetailComment>
      </div>
      <div className="sticky border top-48 my-5 h-fit xl:col-span-1 col-span-2">
        <div className="grid grid-cols-3">
          <h3 className="text-center py-2 font-bold bg-gray-50 hover:bg-white cursor-pointer text-gray-400 hover:text-green-400 border border-b-2 hover:border-b-green-400 duration-300">
            Basic
          </h3>
          <h3 className="text-center py-2 font-bold bg-gray-50 hover:bg-white cursor-pointer text-gray-400 hover:text-green-400 border border-b-2 hover:border-b-green-400 duration-300">
            Standar
          </h3>
          <h3 className="text-center py-2 font-bold bg-gray-50 hover:bg-white cursor-pointer text-gray-400 hover:text-green-400 border border-b-2 hover:border-b-green-400 duration-300">
            Premium
          </h3>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between mb-3">
            <h3 className="text-2xl font-semibold"> Basic</h3>
            <h3 className="text-2xl font-semibold">
              US${congViecChiTiet?.congViec.giaTien}
            </h3>
          </div>
          <span className="">{congViecChiTiet?.congViec.moTaNgan}</span>
          {/* <div className="flex flex-wrap items-center  font-semibold">
            <span className="mr-10">123123</span>
            <span>123123</span>
          </div> */}
          <ul className="my-4">
            <li className="flex flex-wrap items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 9"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1dbf73"
              >
                <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
              </svg>
              Good services
            </li>
            <li className="flex flex-wrap items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 9"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1dbf73"
              >
                <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
              </svg>
              Good fearture
            </li>
            <li className="flex flex-wrap items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 9"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1dbf73"
              >
                <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
              </svg>
              Good morning :)
            </li>
          </ul>
          <button
            onClick={() => {
              thueViec();
            }}
            className="bg-green-400 font-semibold text-white w-full py-2 rounded-md"
          >
            Continue (US$ {congViecChiTiet?.congViec.giaTien})
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
