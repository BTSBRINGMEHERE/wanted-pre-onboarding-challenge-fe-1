import React from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { mainUrl } from "../http/api";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "../atoms";
import useSetUserState from "./useSetUserState";
import { AxiosError } from "axios";

interface LoginData {
  message: string;
  token: string;
}

interface LoginVariable {
  email: string;
  password: string;
}
// TODO: Axios interface 만들고 주석 제거하기
// {
//     "data": {
//         "details": "로그인에 실패했습니다"
//     },
//     "status": 400,
//     "statusText": "Bad Request",
//     "headers": {
//         "content-length": "45",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {
//             "FormData": null
//         },
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Content-Type": "application/json",
//             "Authorization": ""
//         },
//         "url": "http://localhost:8080/users/login",
//         "method": "post",
//         "data": "{\"email\":\"admin@gmail.com\",\"password\":\"e22222222222\"}"
//     },
//     "request": {}
// }

const useLogin = () => {
  const { postData } = useFetch<LoginVariable, LoginData>(mainUrl.baseUrl);
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
        setLocalStorage(token);
        setUserState((pre) => ({ ...pre, isLogin: false, token }));
      }
    }
  );
};
export default useLogin;
