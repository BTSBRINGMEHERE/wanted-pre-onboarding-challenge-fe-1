import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../lib/atoms/user";
import ToDoList from "./ToDoList";

interface IToDoListContainerProps {}

const Wrapper = styled.div``;

const ToDoListContainer = () => {
  const { token } = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    {
      data: {
        title: string;
        content: string;
        id: string;
        createdAt: string;
        updatedAt: string;
      };
    },
    Error,
    { title: string; content: string }
  >(async (body) => {
    const response = await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body)
    });
    return response.json();
  });
  const handleTodo = () => {
    mutate(
      {
        title: "할 일을 적어주세요.",
        content: "할 일의 이야기를 적어보세요."
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["todoList"]);
        }
      }
    );
  };

  return (
    <Wrapper>
      {!token && <h1>로그인을 해주세요.</h1>}
      {token && (
        <>
          <button onClick={handleTodo}>할 일 만들기</button>
          <ToDoList />
        </>
      )}
    </Wrapper>
  );
};

export default ToDoListContainer;
