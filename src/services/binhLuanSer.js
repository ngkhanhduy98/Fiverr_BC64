import { http } from "./urlConfig";

export const binhLuanSer = {
  binhLuanTheoCongViec: (idCongViec) => {
    let uri = `/api/binh-luan/lay-binh-luan-theo-cong-viec/${idCongViec}`;
    return http.get(uri);
  },
  postBinhLuan: (data, userToken) => {
    let uri = `/api/binh-luan`;
    return http.post(uri, data, {
      headers: {
        token: userToken,
      },
    });
  },
};
