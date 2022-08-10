import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../http/api";
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
  const queryClient = useQueryClient();
  const { putData } = useFetch(api.baseUrl);

  return useMutation<UpdateTodoData, Error, UpdateTodoVariable, unknown>(
    async ({ id, body }) => putData(`/todos/${id}`, body),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["todoList"]);
        queryClient.invalidateQueries(["todo", data.id]);
      },
    },
  );
};

export default useUpdateTodo;
