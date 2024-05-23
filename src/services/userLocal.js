export const userLocal = {
  set: (userInfor) => {
    if (userInfor !== null && userInfor !== undefined) {
      let json = JSON.stringify(userInfor);
      localStorage.setItem("USER_INFO", json);
    }
  },
  get: () => {
    let json = localStorage.getItem("USER_INFO");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  del: () => {
    localStorage.removeItem("USER_INFO");
  },
};
