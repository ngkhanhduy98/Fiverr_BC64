import { http } from "./urlConfig";

export const congViecSer = {
  getCongViecData: () => {
    let uri = "/api/cong-viec/";
    return http.get(uri);
  },
  menuLoaiCongViec: () => {
    let uri = "/api/cong-viec/lay-menu-loai-cong-viec";
    return http.get(uri);
  },
  chiTietLoaiCongViec: (idLoaiCongViec) => {
    let uri = `/api/cong-viec/lay-chi-tiet-loai-cong-viec/${idLoaiCongViec}`;
    return http.get(uri);
  },
  congViecTheoChiTietLoai: (idNhomCongViec) => {
    let uri = `/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${idNhomCongViec}`;
    return http.get(uri);
  },
  congViecChiTiet: (idCongViec) => {
    let uri = `/api/cong-viec/lay-cong-viec-chi-tiet/${idCongViec}`;
    return http.get(uri);
  },
};
