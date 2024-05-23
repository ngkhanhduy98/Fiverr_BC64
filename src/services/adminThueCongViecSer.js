import { http } from "./urlConfig";

export const adminThueCongViecSer = {
  getThueCongViec: () => {
    let uri = "/api/thue-cong-viec/";
    return http.get(uri);
  },
};
