import { http } from "./urlConfig";

export const adminLoaiCongViecSer = {
  getLoaiCongViec: () => {
    let uri = "/api/loai-cong-viec/";
    return http.get(uri);
  },
};
