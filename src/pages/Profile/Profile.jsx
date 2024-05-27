import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thueCongViecSer } from "../../services/thueCongViecSer";
import { logOutAction } from "../../redux/userReducer/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { nguoiDungSer } from "../../services/nguoiDungSer";
import { userLocal } from "../../services/userLocal";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginThunk } from "../../redux/userReducer/userThunk";

const Profile = () => {
  const { userInfor } = useSelector((state) => state.userReducer);
  const [dsCongViec, setDsCongViec] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formEditProfile = useFormik({
    initialValues: {
      id: userInfor.user.id,
      email: userInfor.user.email,
      name: userInfor.user.name,
      phone: userInfor.user.phone,
      birthday: userInfor.user.birthday,
    },
    onSubmit: async (value) => {
      try {
        const promise = await nguoiDungSer.putUserData(
          value,
          userInfor.user.id
        );
        console.log("🤪 ~ onSubmit: ~ promise:", promise);

        // console.log("🤪 ~ onSubmit: ~ promise:", promise);
        if (promise.status == 200) {
          Swal.fire({
            title: "Đăng nhập thành công",
            text: "Bạn sẽ được chuyển về trang chủ",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            let dataLocal = userLocal.get();
            // console.log(`Data truoc update`, dataLocal);
            dataLocal.user = promise.data.content;
            // console.log(`Data sau update`, dataLocal);
            userLocal.del();
            userLocal.set(dataLocal);
          });
        }
        // } else {
        //   Swal.fire({
        //     title: "Đăng nhập thất bại",
        //     text: "Vui lòng thử lại",
        //     icon: "error",
        //     timer: 2000,
        //     timerProgressBar: true,
        //   });
        // }
      } catch (error) {}
    },
  });

  const handleChangeImg = async (event) => {
    const bodyFormData = new FormData();
    bodyFormData.append("formFile", event.target.files[0]);
    // console.log("🤪 ~ handleChangeImg ~ bodyFormData:", bodyFormData);
    const promise = await nguoiDungSer.postUserAvatar(
      bodyFormData,
      userInfor.token
    );
    // console.log("🤪 ~ handleChangeImg ~ promise:", promise);
    if (promise.data.statusCode == 200) {
      Swal.fire({
        title: "Done",
        text: "Bạn đã upload hình ảnh thành công",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        let dataLocal = userLocal.get();
        // console.log(`Data truoc update`, dataLocal);
        dataLocal.user.avatar = promise.data.content.avatar;
        // console.log(`Data sau update`, dataLocal);
        userLocal.del();
        userLocal.set(dataLocal);
      });
    }

    event.target.value = "";
  };

  const fetchDsCongViec = async () => {
    try {
      let data = await thueCongViecSer.getCongViecDaThue(userInfor.token);
      setDsCongViec(data.data.content);
      // console.log(`Data cong viec`, data.data.content);
    } catch (error) {}
  };
  const handleLogOut = () => {
    dispatch(logOutAction());
    navigate("/");
    Swal.fire({
      title: "Done",
      text: "Bạn đã đăng xuất thành công",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
  };
  const delCongViec = async (id) => {
    // console.log(userInfor.token);
    // console.log(id);

    try {
      const promise = await thueCongViecSer.delCongViecDaThue(
        id,
        userInfor.token
      );
      Swal.fire({
        title: "Done",
        text: "Bạn đã xóa thành công",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      fetchDsCongViec();
    } catch (error) {}
  };
  const clickToOpenFile = () => {
    ref.current.click();
    // console.log("🤪 ~ clickToOpenFile ~ ref:", ref);
    // console.log(`click`);
  };

  useEffect(() => {
    fetchDsCongViec();
  }, []);

  const renderDsCongViecDaThue = () => {
    return dsCongViec?.map((data, i) => {
      return (
        <div className="grid grid-cols-3 border mt-5 p-10" key={i}>
          <div className="pr-4">
            <img
              src={data.congViec.hinhAnh}
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="col-span-2">
            <h4 className="font-semibold text-xl">
              {data.congViec.tenCongViec}
            </h4>
            <p className="font-light">{data.congViec.moTa}</p>
            <div className="flex flex-wrap items-center justify-between">
              <span className="flex flex-wrap items-center">
                <svg
                  className="svg-inline--fa fa-star w-6 h-6 fill-yellow-300"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  data-fa-i2svg
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
                ({data.congViec.danhGia})
              </span>
              <span className="text-gray-500 text-xl">
                ${data.congViec.giaTien}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-end mt-3">
              <button className="text-xl text-white bg-green-500 px-6 py-2 rounded-md mr-5 hover:shadow-xl duration-300">
                View detail
              </button>
              <button
                onClick={() => {
                  delCongViec(data.id);
                }}
                className="text-xl text-white bg-red-600 px-6 py-2 rounded-md hover:shadow-xl duration-300"
              >
                Del
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(`úser infor`, userInfor);
  return (
    <div className="xl:max-w-[1400px] mx-auto max-w-[96%] py-6 grid-cols-1 grid md:grid-cols-3">
      <div className="pr-10">
        <h3 className="text-xl font-semibol">Your Profile</h3>
        <div className="border my-2 p-10">
          <input
            type={`file`}
            onChange={(event) => handleChangeImg(event)}
            className=""
            hidden
            ref={ref}
          ></input>
          <img
            onClick={() => {
              clickToOpenFile();
            }}
            src={userInfor?.user.avatar}
            alt=""
            className="w-40 h-40 rounded-full border mx-auto my-5 object-cover"
          />
          <h4 className="text-center my-5 text-xl font-semibold">
            {userInfor?.user.name}
          </h4>
          <hr />
          <div className="flex flex-wrap items-center justify-between mt-2">
            <span className="flex flex-wrap items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width={20}
                height={20}
                viewBox="0 0 256 256"
                xmlSpace="preserve"
                className="mr-2"
              >
                <defs />
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 45 37.918 c -6.42 0 -11.643 -5.223 -11.643 -11.643 S 38.58 14.633 45 14.633 s 11.643 5.223 11.643 11.643 S 51.42 37.918 45 37.918 z M 45 16.633 c -5.317 0 -9.643 4.326 -9.643 9.643 c 0 5.317 4.326 9.643 9.643 9.643 c 5.317 0 9.643 -4.326 9.643 -9.643 C 54.643 20.958 50.317 16.633 45 16.633 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 45 85.381 c -9.876 0 -18.488 -2.187 -21.43 -5.44 c -0.371 -0.41 -0.338 -1.042 0.071 -1.413 c 0.409 -0.371 1.042 -0.338 1.412 0.071 c 2.545 2.815 10.747 4.782 19.946 4.782 c 0.552 0 1 0.447 1 1 S 45.552 85.381 45 85.381 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                  <path
                    d="M 50.167 68.262 c 2.362 -4.421 5.299 -8.625 8.181 -12.749 c 6.287 -8.999 12.789 -18.304 12.789 -29.375 C 71.137 11.725 59.412 0 45 0 S 18.863 11.725 18.863 26.137 c 0 11.071 6.502 20.376 12.79 29.375 c 2.882 4.125 5.818 8.328 8.181 12.749 c -13.491 0.928 -23.125 5.368 -23.125 10.78 C 16.708 85.187 29.136 90 45 90 s 28.292 -4.813 28.292 -10.958 C 73.292 73.629 63.657 69.189 50.167 68.262 z M 20.863 26.137 C 20.863 12.828 31.691 2 45 2 c 13.309 0 24.137 10.828 24.137 24.137 c 0 10.442 -6.037 19.083 -12.429 28.23 c -3.208 4.591 -6.467 9.285 -8.987 14.297 c -0.028 0.046 -0.052 0.091 -0.072 0.141 c -1.024 2.051 -1.936 4.151 -2.649 6.327 c -0.713 -2.175 -1.624 -4.273 -2.648 -6.323 c -0.022 -0.055 -0.048 -0.103 -0.078 -0.153 c -2.519 -5.008 -5.776 -9.7 -8.983 -14.289 C 26.9 45.219 20.863 36.579 20.863 26.137 z M 45 88 c -15.494 0 -26.292 -4.721 -26.292 -8.958 c 0 -3.769 8.264 -8.05 22.115 -8.831 c 1.39 2.859 2.515 5.813 3.201 8.901 c 0.102 0.458 0.507 0.783 0.976 0.783 s 0.875 -0.325 0.976 -0.783 c 0.686 -3.088 1.811 -6.042 3.201 -8.901 c 13.851 0.782 22.115 5.063 22.115 8.831 C 71.292 83.279 60.494 88 45 88 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform=" matrix(1 0 0 1 0 0) "
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              From
            </span>
            <span className="font-semibold">Viet Nam</span>
          </div>
          <div className="flex flex-wrap items-center justify-between mt-5">
            <span className="flex flex-wrap items-center">
              <svg
                className="svg-inline--fa fa-user icon w-[20px] h-[20px] mr-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg
              >
                <path
                  fill="currentColor"
                  d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
              Member since
            </span>
            <span className="font-semibold">Jan 2023</span>
          </div>
          <div className="flex flex-wrap justify-end">
            <button
              onClick={showModal}
              className="py-2 px-4 bg-gray-200 border rounded-lg mt-5 cursor-pointer font-semibold hover:bg-gray-300 duration-300 "
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleLogOut();
              }}
              className=" text-white ml-5 py-2 px-4 bg-red-600 border rounded-lg mt-5 cursor-pointer font-semibold hover:bg-red-700 duration-300 "
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="border my-2 p-10">
          <h3 className="font-semibold mb-3 text-[18px]">Description</h3>
          <div className="grid grid-cols-2 space-y-4 mb-4 text-gray-500">
            <h5 className="mt-4">Email:</h5> <p>{userInfor?.user.email}</p>
            <h5>Phone:</h5> <p>{userInfor?.user.phone}</p>
            <h5>Birthday:</h5> <p>{userInfor?.user.birthday}</p>
          </div>
          <hr />
          <h3 className="font-semibold mb-3 text-[18px] mt-4">Languages</h3>
          <div className="grid grid-cols-2 space-y-4 mb-4 text-gray-500">
            <p className="mt-4">English </p>
            <p className="text-gray-400">Basic</p>
            <p className="mt-4">Vietnamese </p>
            <p className="text-gray-400">Native/Bilingual</p>
          </div>
          <hr />
          <h3 className="font-semibold mb-3 text-[18px] mt-4">Skill</h3>
        </div>
      </div>
      <div className="col-span-2">
        <h3 className="text-xl font-semibold mb-2">Your Gig.</h3>
        <div className="flex flex-wrap justify-between items-center p-10 border">
          <h3 className="text-gray-500 font-semibold text-[20px]">
            It seems that you don't have any active Gigs.
          </h3>
          <button className="py-2 px-4 text-[20px] text-white font-semibold bg-green-500 rounded-md hover:shadow-xl duration-300">
            Create new Gig
          </button>
        </div>
        {renderDsCongViecDaThue()}
      </div>
      <Modal
        title="Edit your profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="" onSubmit={formEditProfile.handleSubmit}>
          <div className="grid grid-cols-2 space-x-2">
            <div className="ml-2">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                disabled
                value={userInfor.user.email}
                type="text"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                onChange={formEditProfile.handleChange}
                defaultValue={userInfor.user.name}
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                onChange={formEditProfile.handleChange}
                type="text"
                id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={userInfor.user.phone}
                required
              />
            </div>
            <div>
              <label
                for="birthday"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                BirthDay
              </label>
              <input
                defaultValue={userInfor.user.birthday}
                onChange={formEditProfile.handleChange}
                type="text"
                id="birthday"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="absolute left-8 bg-green-400 px-5 py-2 rounded-md mt-2 font-semibold text-white hover:bg-green-500 duration-300"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
