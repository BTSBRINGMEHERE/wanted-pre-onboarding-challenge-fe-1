import React from "react";
import { useQuery } from "@tanstack/react-query";
import useFetch from "./useFetch";
import { api } from "../http/api";

interface GetTodosVariables {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const useGetTodos = () => {
  const { getData } = useFetch(api.baseUrl);

  return useQuery<GetTodosVariables[], Error>(
    ["todoList"],
    async () => await getData("/todos"),
  );
};

export default useGetTodos;
