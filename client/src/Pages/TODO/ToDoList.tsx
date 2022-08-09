import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useGetTodos from "../../lib/hooks/useGetTodos";

interface IToDoListProps {}

const ToDoList = () => {
  const { data: todos, isLoading, isSuccess } = useGetTodos();

  return isLoading ? (
    <h1>할 일 불러오는 중</h1>
  ) : (
    <div>
      <ul>
        {todos?.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
