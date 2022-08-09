import React from "react";
import { useParams } from "react-router-dom";
import useGetTodoDetail from "../../lib/hooks/useGetTodoDetail";

interface IToDoDetailProps {}

const ToDoDetail = () => {
  const { todoId } = useParams();
  const { data: todo } = useGetTodoDetail({ id: todoId ? todoId : "" });

  return <div>{todo?.title}</div>;
};

export default ToDoDetail;
