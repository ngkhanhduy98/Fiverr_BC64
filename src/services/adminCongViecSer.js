import { http } from "./urlConfig";

export const adminCongViecSer = {
  getCongViecData: () => {
    let uri = "/api/cong-viec/";
    return http.get(uri);
  },
  delCongViec: (id, userToken) => {
    let uri = `/api/cong-viec/${id}`;
    return http.delete(uri, {
      headers: {
        token: userToken,
      },
    });
  },
  postCongViec: (data, userToken) => {
    let uri = `/api/cong-viec/`;
    return http.post(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
  putCongViec: (data, id, userToken) => {
    let uri = `/api/cong-viec/${id}`;
    return http.put(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
  getCongViecById: (id) => {
    let uri = `/api/cong-viec/${id}`;
    return http.get(uri);
  },
};
