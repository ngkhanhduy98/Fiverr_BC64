import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckPermission = ({ children }) => {
  const navigate = useNavigate();
  const { userInfor } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userInfor || userInfor?.user.role != "ADMIN") {
      navigate("/");
      Swal.fire({
        title: "Vui lòng đăng nhập!",
        text: "Không có quyền truy cập trang này",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  }, [userInfor]);
  return <>{children}</>;
};

export default CheckPermission;
