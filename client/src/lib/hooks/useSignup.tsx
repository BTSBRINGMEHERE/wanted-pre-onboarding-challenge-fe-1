import React from "react";
import { useMutation } from "@tanstack/react-query";

interface SignupData {
  message: string;
  token: string;
}
interface SignupVariable {
  email: string;
  password: string;
}

const useSignup = () => {
  return useMutation<SignupData, Error, SignupVariable, unknown>(
    async (body) => {
      const response = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
  );
};

export default useSignup;
