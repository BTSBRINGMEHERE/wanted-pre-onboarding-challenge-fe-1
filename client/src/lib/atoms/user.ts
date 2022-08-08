import { atom } from "recoil";

interface UserState {
  isLogin: boolean;
  token: string;
}

export const userState = atom<UserState>({
  key: "userState",
  default: { isLogin: false, token: "" },
});
