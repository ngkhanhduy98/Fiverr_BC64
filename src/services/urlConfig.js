import axios from "axios";

export const BASE_URL = "https://fiverrnew.cybersoft.edu.vn";
export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODkwMDAwMCIsIm5iZiI6MTY5NTkyMDQwMCwiZXhwIjoxNzI1Mjk2NDAwfQ.l86LVJIHAEP4MrkrVI_P3SmcSZj5fQv7BKwh3Mm43EA";
export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    tokenCybersoft: TOKEN_CYBER,
  },
});
