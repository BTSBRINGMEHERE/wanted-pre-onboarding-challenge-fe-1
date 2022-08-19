import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";
import { mainUrl } from "@/lib/http";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/lib/atoms";

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
  const { postData } = useFetch<CreateTodoVariable, CreateTodoData>(
    mainUrl.baseUrl
  );
  const queryClient = useQueryClient();

  return useMutation<CreateTodoData, Error, CreateTodoVariable, unknown>(
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
      onError: (error) => {}
    }
  );
};

export default useCreateTodo;
