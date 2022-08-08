import React from "react";
import { useMutation } from "@tanstack/react-query";

interface LoginData {
  message: string;
  token: string;
}

interface LoginVariable {
  email: string;
  password: string;
}

const useLogin = () => {
  return useMutation<LoginData, Error, LoginVariable, unknown>(async (body) => {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    return response.json();
  });
};
export default useLogin;
