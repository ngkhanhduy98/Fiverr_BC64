import { http } from "./urlConfig";

export const adminCongViecSer = {
  getCongViecData: () => {
    let uri = "/api/cong-viec/";
    return http.get(uri);
  },
};
