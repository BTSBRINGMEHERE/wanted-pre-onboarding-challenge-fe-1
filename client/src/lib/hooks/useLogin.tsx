import React from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { api } from "../http/api";

interface LoginData {
  message: string;
  token: string;
}

interface LoginVariable {
  email: string;
  password: string;
}

const useLogin = () => {
  const { postData } = useFetch(api.baseUrl);

  return useMutation<LoginData, Error, LoginVariable, unknown>((body) =>
    postData(`/users/login`, body),
  );
};
export default useLogin;
