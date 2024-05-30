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
  postLoaiCongViec: (data, userToken) => {
    let uri = "/api/loai-cong-viec/";
    return http.post(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
  getLoaiCongViecById: (id) => {
    let uri = `/api/loai-cong-viec/${id}`;
    return http.get(uri);
  },
  putLoaiCongViecById: (data, id, userToken) => {
    let uri = `/api/loai-cong-viec/${id}`;
    return http.put(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
};
