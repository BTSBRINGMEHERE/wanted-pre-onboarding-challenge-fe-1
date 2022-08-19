import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";
import { mainUrl } from "@/lib/http";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/lib/atoms";

interface DeleteTodoVariable {
  id: string;
}
interface DeleteTodoData {
  data: null;
}
const useDeleteTodo = () => {
  const setSnackbarQueue = useSetRecoilState(snackbarState);
  const queryClient = useQueryClient();
  const { deleteData } = useFetch<DeleteTodoVariable, DeleteTodoData>(
    mainUrl.baseUrl
  );

  return useMutation<DeleteTodoData, Error, DeleteTodoVariable, unknown>(
    ({ id }) => deleteData(`/todos/${id}`),
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
