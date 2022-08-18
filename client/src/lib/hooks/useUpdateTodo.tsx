import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "../atoms/snackbar";
import { mainUrl } from "../http/api";
import useFetch from "./useFetch";

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
  const setSnackbarQueue = useSetRecoilState(snackbarState);
  const queryClient = useQueryClient();
  const { putData } = useFetch<UpdateTodoVariable["body"], UpdateTodoData>(
    mainUrl.baseUrl
  );

  return useMutation<UpdateTodoData, Error, UpdateTodoVariable, unknown>(
    async ({ id, body }) => await putData(`/todos/${id}`, body),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["todoList"]);
        queryClient.invalidateQueries(["todo", data.id]);
        setSnackbarQueue((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            message: "⚠️ 할 일을 수정했습니다.",
            type: "caution"
          }
        ]);
      }
    }
  );
};

export default useUpdateTodo;
