import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../../lib/atoms/user";

interface GetTodosVariables {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const useGetTodos = () => {
  const { token } = useRecoilValue(userState);

  return useQuery<GetTodosVariables[], Error>(["todoList"], async () => {
    const response = await fetch("http://localhost:8080/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const { data } = await response.json();

    return data;
  });
};

export default useGetTodos;
