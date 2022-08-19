import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/lib/hooks";
import { mainUrl } from "@/lib/http";

interface TodoDetail {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoDetailData {
  data: TodoDetail;
}

interface TodoDetailVariable {
  id: string;
}

const useGetTodoDetail = ({ id }: TodoDetailVariable) => {
  const { getData } = useFetch<unknown, TodoDetailData>(mainUrl.baseUrl);

  return useQuery<TodoDetailData, Error, TodoDetail>(
    ["todo", id],
    () => getData(`/todos/${id}`),
    {
      select: ({ data }) => {
        return data;
      }
    }
  );
};

export default useGetTodoDetail;
