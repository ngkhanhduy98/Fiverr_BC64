import { http } from "./urlConfig";

export const nguoiDungSer = {
  getUsers: () => {
    let uri = "/api/users";
    return http.get(uri);
  },
  postUserAvatar: (data, userToken) => {
    let uri = "/api/users/upload-avatar";
    return http.post(uri, data, {
      headers: {
        token: userToken,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
