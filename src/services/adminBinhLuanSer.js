import { http } from "./urlConfig";

export const adminBinhLuanSer = {
  getBinhLuan: () => {
    let uri = "/api/binh-luan/";
    return http.get(uri);
  },
  delBinhLuan: (id, userToken) => {
    let uri = `/api/binh-luan/${id}`;
    return http.delete(uri, {
      headers: {
        token: userToken,
      },
    });
  },
};
