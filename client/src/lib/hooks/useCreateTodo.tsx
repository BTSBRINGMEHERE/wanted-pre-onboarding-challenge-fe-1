import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

interface IuseCreateTodoProps {}

const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(userState);

  return useMutation<
    {
      data: {
        title: string;
        content: string;
        id: string;
        createdAt: string;
        updatedAt: string;
      };
    },
    Error,
    { title: string; content: string }
  >(
    async (body) => {
      const response = await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      });
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoList"]);
      },
    },
  );
};

export default useCreateTodo;
