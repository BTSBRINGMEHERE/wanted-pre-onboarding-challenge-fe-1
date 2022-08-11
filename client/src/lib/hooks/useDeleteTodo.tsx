import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { api } from "../http/api";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "../atoms/snackbar";

interface DeleteTodoVariable {
  id: string;
}
interface DeleteTodoData {
  data: null;
}
const useDeleteTodo = () => {
  const setSnackbarQueue = useSetRecoilState(snackbarState);
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
        setSnackbarQueue((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            message: "❌ 할 일을 삭제했습니다.",
            type: "warning"
          }
        ]);
      }
    }
  );
};

export default useDeleteTodo;
