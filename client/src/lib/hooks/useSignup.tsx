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

  return useMutation<SignupData, Error, SignupVariable, unknown>((body) =>
    postData("/users/create", body),
  );
};

export default useSignup;
