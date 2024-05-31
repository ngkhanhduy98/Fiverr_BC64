import { http } from "./urlConfig";

export const adminThueCongViecSer = {
  getThueCongViec: () => {
    let uri = "/api/thue-cong-viec/";
    return http.get(uri);
  },
  delCongViecThue: (id, userToken) => {
    let uri = `/api/thue-cong-viec/${id}`;
    return http.delete(uri, {
      headers: {
        token: userToken,
      },
    });
  },
  getCongViecThueById: (id, userToken) => {
    let uri = `/api/thue-cong-viec/${id}`;
    return http.get(uri, {
      headers: {
        token: userToken,
      },
    });
  },
  putCongViecThueById: (id, data, userToken) => {
    let uri = `/api/thue-cong-viec/${id}`;
    return http.put(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
};
