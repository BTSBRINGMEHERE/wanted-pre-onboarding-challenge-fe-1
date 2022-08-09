import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

interface IuseUpdateTodoProps {}

interface UpdateTodoVariable {
  id: string;
  body: {
    title: string;
    content: string;
  };
}

interface UpdateTodoData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(userState);

  return useMutation<UpdateTodoData, Error, UpdateTodoVariable, unknown>(
    async ({ id, body }) => {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(body)
      });

      const { data } = await response.json();

      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["todo", data.id]);
      }
    }
  );
};

export default useUpdateTodo;
