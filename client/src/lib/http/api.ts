import axios from "axios";

interface UserInfo {
  isLogin: true;
  token: string;
}

const getToken = () => {
  const data = localStorage.getItem("justdoit");
  if (data) {
    const { token } = JSON.parse(data) as UserInfo;
    return token;
  }
  return false;
};

const token = getToken();

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  },
  timeout: 1000
});
