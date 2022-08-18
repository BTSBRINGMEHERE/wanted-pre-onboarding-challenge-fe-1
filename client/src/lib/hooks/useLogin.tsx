import React from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { mainUrl } from "../http/api";

interface LoginData {
  message: string;
  token: string;
}

interface LoginVariable {
  email: string;
  password: string;
}

const useLogin = () => {
  const { postData } = useFetch(mainUrl.baseUrl);

  return useMutation<LoginData, Error, LoginVariable, unknown>(
    async (body) => await postData(`/users/login`, body)
  );
};
export default useLogin;
