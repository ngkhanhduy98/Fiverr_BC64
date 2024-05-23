import { http } from "./urlConfig";

export const adminBinhLuanSer = {
  getBinhLuan: () => {
    let uri = "/api/binh-luan/";
    return http.get(uri);
  },
};
