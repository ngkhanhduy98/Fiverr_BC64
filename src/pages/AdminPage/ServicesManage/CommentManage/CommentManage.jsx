import React, { useEffect, useState } from "react";
import { adminBinhLuanSer } from "../../../../services/adminBinhLuanSer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { Modal } from "antd";

const CommentManage = () => {
  const [commentData, setCommentData] = useState();
  const [commentDataById, setCommentDataById] = useState();
  const { userInfor } = useSelector((state) => state.userReducer);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  let headerToken = userInfor.token;
  const fetchCommentData = async () => {
    try {
      let data = await adminBinhLuanSer.getBinhLuan();
      setCommentData(data.data.content);
      console.log(`data`, data.data.content);
    } catch (error) {}
  };
  const getCommentById = (CommentId) => {
    let int = 0;
    for (int; int <= commentData.length; int++) {
      if (commentData[int]?.id == CommentId) {
        setCommentDataById(commentData[int]);
        formEditComment.setFieldValue("noiDung", commentData[int].noiDung);
      }
    }

    showEditCommentModal();
  };
  const xoaBinhLuan = async (id) => {
    console.log(`Token`, userInfor.token);
    let data = await adminBinhLuanSer.delBinhLuan(id, headerToken);
    if (data) {
      Swal.fire({
        title: "Thành công",
        text: "Bình luận của bạn đã được xóa",
        icon: "success",
      });
    }
    fetchCommentData();
  };
  //Sua noi dung cmnt
  const formEditComment = useFormik({
    initialValues: {
      id: commentDataById?.id,
      maCongViec: commentDataById?.maCongViec,
      maNguoiBinhLuan: commentDataById?.maNguoiBinhLuan,
      ngayBinhLuan: commentDataById?.ngayBinhLuan,
      noiDung: commentDataById?.noiDung,
      saoBinhLuan: commentDataById?.saoBinhLuan,
    },
    onSubmit: async (value) => {
      value = {
        id: commentDataById?.id,
        maCongViec: commentDataById?.maCongViec,
        maNguoiBinhLuan: commentDataById?.maNguoiBinhLuan,
        noiDung: value.noiDung,

        ngayBinhLuan: commentDataById?.ngayBinhLuan,
        saoBinhLuan: commentDataById?.saoBinhLuan,
      };

      try {
        const data = await adminBinhLuanSer.putBinhLuanById(
          commentDataById?.id,
          value,
          userInfor.token
        );
        console.log(`Post thành công`, data);
        if (data.data.statusCode == 200) {
          Swal.fire({
            title: "Thành công",
            text: "Chỉnh sửa thành công",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setIsEditCommentModalOpen(false);
          fetchCommentData();
        }
      } catch (error) {
        Swal.fire({
          title: "Đăng ký thất bại",
          text: error.response.data.content,
          icon: "error",
        });
      }
    },
  });
  const showEditCommentModal = () => {
    setIsEditCommentModalOpen(true);
    // getUserDataById(id);
  };
  const handleEditOK = () => {
    setIsEditCommentModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditCommentModalOpen(false);
  };
  useEffect(() => {
    fetchCommentData();
  }, []);
  const renderCommentList = () => {
    return commentData?.map((data, i) => {
      return (
        <tr className="bg-white border-b" key={i}>
          <td className="px-6 py-4">{data.id}</td>
          <td className="px-6 py-4">{data.maCongViec} </td>
          <td className="px-6 py-4">{data.maNguoiBinhLuan} </td>
          <td className="px-6 py-4 max-w-80">{data.noiDung} </td>
          <td className="px-6 py-4">
            <button
              onClick={() => {
                getCommentById(data.id);
              }}
              className="mr-2 py-1 px-3 rounded-lg bg-black text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => {
                xoaBinhLuan(data.id);
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
                Comment ID
              </th>
              <th scope="col" className="px-6 py-3">
                Job ID
              </th>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderCommentList()}</tbody>
        </table>
      </div>
      <Modal
        title="Edit Comment"
        open={isEditCommentModalOpen}
        onOk={handleEditOK}
        onCancel={handleEditCancel}
      >
        <form action="" onSubmit={formEditComment.handleSubmit}>
          <div className="">
            <div className="ml-2">
              <label
                htmlFor="noiDung"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nội dung bình luận
              </label>
              <textarea
                value={formEditComment.values.noiDung}
                onChange={formEditComment.handleChange}
                rows={4}
                type="text"
                id="noiDung"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-7 py-2 bg-green-400 hover:bg-green-500 duration-300 text-white font-semibold absolute left-8 bottom-4 rounded-lg"
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CommentManage;
