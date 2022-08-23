import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";

import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/lib/atoms";
import useSetUserState from "./useSetUserState";
import { AxiosError } from "axios";
import useValidation from "./useValidation";

interface LoginData {
  message: string;
  token: string;
}

interface LoginVariable {
  email: string;
  password: string;
}

const useLogin = () => {
  const { postData } = useFetch<LoginVariable, LoginData>();
  const setSnackBar = useSetRecoilState(snackbarState);
  const { setLocalStorage, setUserState } = useSetUserState();
  return useMutation<LoginData, AxiosError, LoginVariable>(
    async (body) => await postData(`/users/login`, body),
    {
      useErrorBoundary: (error) => {
        return error.response ? error.response.status >= 500 : false;
      },
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackBar((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              type: "warning",
              message: "⛔️ 아이디 또는 비밀번호를 다시 입력해주세요."
            }
          ]);
        }
      },
      onSuccess: ({ token }) => {
        setSnackBar((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            type: "notice",
            message: "✅ 다시 돌아오신것을 환영합니다."
          }
        ]);
        setLocalStorage(token);
        setUserState((pre) => ({ ...pre, isLogin: false, token }));
      }
    }
  );
};
export default useLogin;
