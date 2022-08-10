import React from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { api } from "../http/api";

interface SignupData {
  message: string;
  token: string;
}
interface SignupVariable {
  email: string;
  password: string;
}

const useSignup = () => {
  const { postData } = useFetch(api.baseUrl);

  return useMutation<SignupData, Error, SignupVariable, unknown>(
    async (body) => {
      const { data } = await postData("/users/create", body);
      return data;
    },
  );
};

export default useSignup;
