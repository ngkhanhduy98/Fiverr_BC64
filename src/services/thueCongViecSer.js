import { http } from "./urlConfig";

export const thueCongViecSer = {
  postThueCongViec: (data, userToken) => {
    let uri = `/api/thue-cong-viec`;
    return http.post(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
  getCongViecDaThue: (userToken) => {
    let uri = `/api/thue-cong-viec/lay-danh-sach-da-thue`;
    return http.get(uri, {
      headers: {
        token: userToken,
      },
    });
  },
  delCongViecDaThue: (id, userToken) => {
    let uri = `/api/thue-cong-viec/${id}`;
    return http.delete(uri, {
      headers: {
        token: userToken,
      },
    });
  },
};
