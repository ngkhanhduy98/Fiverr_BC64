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
};
