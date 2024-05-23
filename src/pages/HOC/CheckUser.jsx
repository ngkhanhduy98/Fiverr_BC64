import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckUser = ({ children }) => {
  const navigate = useNavigate();
  const { userInfor } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userInfor) {
      navigate("/auth/login");
      Swal.fire({
        title: "Vui lòng đăng nhập!",
        text: "Bạn cần phải đăng nhập để mở trang này",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  }, [userInfor]);
  return <>{children}</>;
};

export default CheckUser;
