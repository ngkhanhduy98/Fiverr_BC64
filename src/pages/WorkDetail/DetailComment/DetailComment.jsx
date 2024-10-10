import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { binhLuanSer } from "../../../services/binhLuanSer";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const DetailComment = () => {
  const dispacth = useDispatch();
  const { idCongViec } = useParams();
  const [dsCommment, setDanhSachComment] = useState();
  const { userInfor } = useSelector((state) => {
    return state.userReducer;
  });
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  const fetchBinhLuan = async () => {
    try {
      let data = await binhLuanSer.binhLuanTheoCongViec(idCongViec);
      setDanhSachComment(data.data.content);
    } catch (error) {}
  };
  const formComment = useFormik({
    initialValues: {
      id: 0,
      maCongViec: idCongViec,
      maNguoiBinhLuan: userInfor?.user.id,
      ngayBinhLuan: today,
      noiDung: "",
      saoBinhLuan: 0,
    },
    onSubmit: async (value) => {
      if (userInfor) {
        try {
          const promise = await binhLuanSer.postBinhLuan(
            value,
            userInfor.token
          );
          if (promise.data.statusCode == 201) {
            Swal.fire({
              title: "Thành công",
              text: "Bình luận của bạn đã được đăng lên thành công",
              icon: "success",
            }).then(() => {
              fetchBinhLuan();
            });
          }
        } catch (error) {}
      } else {
        Swal.fire({
          title: "Thất bại",
          text: "Bạn cần phải đăng nhập để có thể gửi bình luận",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },
  });
  const renderBinhLuan = () => {
    return dsCommment?.map((data, i) => {
      return (
        <div className="" key={i}>
          <div className="border-t py-3 flex flex-wrap">
            <img
              src={data.avatar}
              alt=""
              className="w-20 h-20 rounded-full mr-4 object-cover border"
            />
            <div className="space-y-3">
              <p className="font-semibold">
                {data.tenNguoiBinhLuan}
                <span className="flex flex-wrap item-center">
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
                </svg>| 2</span>
              </p>
              <p className="">{data.ngayBinhLuan}</p>
            </div>
          </div>

          <div>
            <p>{data.noiDung}</p>
            <div className="flex flex-wrap items-center text-xl mb-5">
              <span className="text-xl font-semibold text-gray-500">
                Helpful?
              </span>
              <svg
                className="ml-4"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z" />
              </svg>
              Yes
              <svg
                className="rotate-180 ml-4"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z" />
              </svg>
              No
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    fetchBinhLuan();
  }, []);
  return (
    <div className="">
      {renderBinhLuan()}
      <hr />
      <div className="flex flex-wrap items-center justify-between pt-4 ">
        <h3 className="text-2xl font-semibold my-4">Leave some comments</h3>
        <span>
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
        </span>
      </div>
      <form onSubmit={formComment.handleSubmit}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="noiDung"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
              defaultValue={""}
              onChange={formComment.handleChange}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-green-800"
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailComment;
