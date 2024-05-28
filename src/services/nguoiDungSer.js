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
  putUserData: (data, id) => {
    let uri = `/api/users/${id}`;
    return http.put(uri, data);
  },
  delUser: (id) => {
    let uri = `/api/users/?id=${id}`;
    return http.delete(uri, id);
  },
  postUser: (data) => {
    let uri = "/api/users";
    return http.post(uri, data);
  },
};
