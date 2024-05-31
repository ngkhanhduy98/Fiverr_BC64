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
  postChiTietLoaiCongViec: (data, userToken) => {
    let uri = `/api/chi-tiet-loai-cong-viec/`;
    return http.post(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
  postNhomChiTietLoai: (data, userToken) => {
    let uri = `/api/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai`;
    return http.post(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
  getChiTietLoaiCongViecById: (id) => {
    let uri = `/api/chi-tiet-loai-cong-viec/${id}`;
    return http.get(uri);
  },
};
