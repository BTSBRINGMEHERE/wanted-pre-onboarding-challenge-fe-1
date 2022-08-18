import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { mainUrl } from "../http/api";

interface GetTodosVariables {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const useGetTodos = () => {
  const { getData } = useFetch<unknown, GetTodosVariables[]>(mainUrl.baseUrl);

  return useQuery<GetTodosVariables[], Error>(["todoList"], () =>
    getData("/todos")
  );
};

export default useGetTodos;
