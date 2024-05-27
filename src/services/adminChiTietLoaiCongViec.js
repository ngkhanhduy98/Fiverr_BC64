import { http } from "./urlConfig";

export const adminChiTietLoaiCongViecSer = {
  getChiTietLoaiCongViec: () => {
    let uri = "/api/chi-tiet-loai-cong-viec/";
    return http.get(uri);
  },
  delChiTietLoaiCongViec: (id, userToken) => {
    let uri = `/api/chi-tiet-loai-cong-viec/${id}`;
    return http.delete(uri, {
      headers: {
        token: userToken,
      },
    });
  },
};
