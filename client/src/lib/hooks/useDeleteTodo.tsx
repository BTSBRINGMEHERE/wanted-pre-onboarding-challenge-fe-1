import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

interface IuseDeleteTodoProps {}

interface DeleteTodoVariable {
  id: string;
}
interface DeleteTodoData {
  data: null;
}
const useDeleteTodo = () => {
  const { token } = useRecoilValue(userState);
  return useMutation<DeleteTodoData, Error, DeleteTodoVariable, unknown>(
    async ({ id }) => {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const { data } = await response.json();

      return data;
    },
  );
};

export default useDeleteTodo;
