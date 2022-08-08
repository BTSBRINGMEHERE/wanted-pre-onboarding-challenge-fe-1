import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../lib/atoms/user";

interface IToDoListProps {}

const ToDoList = () => {
  const { token } = useRecoilValue(userState);
  const { data, isLoading, isSuccess } = useQuery(
    ["todoList"],
    async () => {
      const response = await fetch("http://localhost:8080/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      return response.json();
    },
    {
      onSuccess: (data) => {
        console.log(data);
      }
    }
  );

  return <div>ToDoList</div>;
};

export default ToDoList;
