import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { mainUrl } from "../http/api";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "../atoms/snackbar";

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
      }
    }
  );
};

export default useCreateTodo;
