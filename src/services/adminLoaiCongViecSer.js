import { http } from "./urlConfig";

export const adminLoaiCongViecSer = {
  getLoaiCongViec: () => {
    let uri = "/api/loai-cong-viec/";
    return http.get(uri);
  },
  delLoaiCongViec: (id, userToken) => {
    let uri = `/api/loai-cong-viec/${id}`;
    return http.delete(uri, {
      headers: {
        token: userToken,
      },
    });
  },
};
