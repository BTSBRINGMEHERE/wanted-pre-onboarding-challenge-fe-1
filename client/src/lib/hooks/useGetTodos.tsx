import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { mainUrl } from "../http/api";

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
  const { getData } = useFetch<unknown, GetTodosVariables>(mainUrl.baseUrl);

  return useQuery<GetTodosVariables, Error, Todos[]>(
    ["todoList"],
    () => getData("/todos"),
    {
      select: ({ data }) => {
        return data;
      }
    }
  );
};

export default useGetTodos;
