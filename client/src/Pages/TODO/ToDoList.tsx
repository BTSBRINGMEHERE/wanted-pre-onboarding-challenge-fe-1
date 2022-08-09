import React from "react";
import styled from "styled-components";
import useGetTodos from "../../lib/hooks/useGetTodos";
import ToDoItem from "./ToDoItem";

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const ToDoList = () => {
  const { data: todos, isLoading, isSuccess, isRefetching } = useGetTodos();

  return isSuccess ? (
    <Wrapper>
      <ul>
        {todos?.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </Wrapper>
  ) : (
    <h1>할 일 불러오는 중</h1>
  );
};

export default ToDoList;
