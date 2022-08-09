import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

interface TodoDetailData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoDetailVariable {
  id: string;
}

const useGetTodoDetail = ({ id }: TodoDetailVariable) => {
  const { token } = useRecoilValue(userState);

  return useQuery<TodoDetailData, Error>(["todo", id], async ({ queryKey }) => {
    const response = await fetch(`http://localhost:8080/todos/${queryKey[1]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const { data } = await response.json();
    return data;
  });
};

export default useGetTodoDetail;
