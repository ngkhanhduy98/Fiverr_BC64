import { createAsyncThunk } from "@reduxjs/toolkit";
import { authSer } from "../../services/authSer";

export const loginThunk = createAsyncThunk(
  "userReducer/loginThunk",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authSer.postLogin(payload);
      let userInfor = data.data.content;
      console.log("Đăng nhập thành công!");
      // console.log("khuc nay chay");
      // console.log(userInfor);
      return userInfor;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);
