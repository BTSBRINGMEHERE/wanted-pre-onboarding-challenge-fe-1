import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/lib/atoms";
import { mainUrl } from "@/lib/http";
import { useFetch } from "@/lib/hooks";

interface UpdateTodoVariable {
  id: string;
  body: {
    title: string;
    content: string;
  };
}
interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
interface UpdateTodoData {
  data: Todo;
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
      onSuccess: ({ data }) => {
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
