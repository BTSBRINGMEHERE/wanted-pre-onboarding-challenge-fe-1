import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";

import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/lib/atoms";
import { AxiosError } from "axios";

interface CreateTodoData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTodoVariable {
  title: string;
  content: string;
}

const useCreateTodo = () => {
  const setSnackbarQueue = useSetRecoilState(snackbarState);
  const { postData } = useFetch<CreateTodoVariable, CreateTodoData>();
  const queryClient = useQueryClient();

  return useMutation<CreateTodoData, AxiosError, CreateTodoVariable, unknown>(
    (body) => postData("/todos", body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todoList"]);
        setSnackbarQueue((pre) => [
          ...pre,
          {
            id: Date.now().toString(),
            message: "✅ 할 일 등록했습니다.",
            type: "notice"
          }
        ]);
      },
      onError: (error) => {
        if (error.response?.status) {
          setSnackbarQueue((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              message: "⛔️ 할 일을 등록할 수가 없습니다.",
              type: "notice"
            }
          ]);
        }
      }
    }
  );
};

export default useCreateTodo;
