import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { api } from "../http/api";

interface DeleteTodoVariable {
  id: string;
}
interface DeleteTodoData {
  data: null;
}
const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { deleteData } = useFetch(api.baseUrl);

  return useMutation<DeleteTodoData, Error, DeleteTodoVariable, unknown>(
    async ({ id }) => {
      const { data } = await deleteData(`/todos/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoList"]);
      },
    },
  );
};

export default useDeleteTodo;
