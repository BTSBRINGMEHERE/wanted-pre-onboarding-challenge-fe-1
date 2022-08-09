import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useGetTodos from "../../lib/hooks/useGetTodos";
import ToDoItem from "./ToDoItem";

interface IToDoListProps {}

const ToDoList = () => {
  const { data: todos, isLoading, isSuccess, isRefetching } = useGetTodos();

  return isSuccess ? (
    <div>
      <ul>
        {todos?.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  ) : (
    <h1>할 일 불러오는 중</h1>
  );
};

export default ToDoList;
