import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./userThunk";
import { userLocal } from "../../services/userLocal";

const initialState = {
  userInfor: userLocal.get(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logOutAction: (state, action) => {
      //Xóa data trên redux và dưới local storage
      console.log("Da Chay");
      userLocal.del();
      state.userInfor = null;
    },
  },

  //Xử lý action bất đồng bộ
  //Các case: fulfilled: Thành công - pending: đang chờ - reject: thất bại
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("Khuc nay chay roi");
        state.userInfor = action.payload;
        userLocal.set(action.payload);
      })
      .addCase(loginThunk.pending, (state, action) => {
        console.log("1");
      })
      .addCase(loginThunk.rejected, (state, action) => {
        console.log("2");
      });
  },
});

export const { logOutAction } = userSlice.actions;

export default userSlice.reducer;
