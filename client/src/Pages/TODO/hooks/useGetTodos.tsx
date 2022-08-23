import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";

import { snackbarState } from "@/lib/atoms";
import { useSetRecoilState } from "recoil";

interface Todos {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface GetTodosVariables {
  data: Todos[];
}

const useGetTodos = () => {
  const { getData } = useFetch<unknown, GetTodosVariables>();
  const setSnackbarQueue = useSetRecoilState(snackbarState);
  return useQuery<GetTodosVariables, AxiosError, Todos[]>(
    ["todoList"],
    () => getData("/todos"),
    {
      select: ({ data }) => {
        return data.sort((a, b) => (a > b ? 1 : -1));
      },
      onError: (error) => {
        if (error.response?.status === 400) {
          setSnackbarQueue((pre) => [
            ...pre,
            {
              id: Date.now().toString(),
              message: "⛔️ 할 일 목록을 불러올수가 없네요.",
              type: "warning"
            }
          ]);
        }
      }
    }
  );
};

export default useGetTodos;
