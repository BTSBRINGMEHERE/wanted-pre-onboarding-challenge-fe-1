import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useDeleteTodo from "../../lib/hooks/useDeleteTodo";
import useGetLocalDate from "../../lib/hooks/useGetLocalDate";

const Todo = styled.li``;

const Header = styled.div``;

const InfoContinaer = styled.div``;

const ButtonContainer = styled.div``;

interface IToDoItemProps {
  todo: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ToDoItem = ({ todo }: IToDoItemProps) => {
  const { mutate } = useDeleteTodo();

  const { handleUTCTimeToLocalTime } = useGetLocalDate();

  const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.closest("li")?.dataset.id;
    if (id) {
      mutate({ id });
    }
  };

  return (
    <Todo data-id={todo.id}>
      <Link to={`/${todo.id}`}>
        <Header>
          <h3>{todo.title}</h3>
        </Header>
        <InfoContinaer>
          {handleUTCTimeToLocalTime(todo.createdAt)}
        </InfoContinaer>
        <ButtonContainer>
          <button onClick={handleDeleteTodo}>삭제</button>
        </ButtonContainer>
      </Link>
    </Todo>
  );
};

export default ToDoItem;
