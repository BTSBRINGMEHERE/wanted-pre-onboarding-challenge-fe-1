import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import FormContainer from "../../Components/FormContainer";
import { userState } from "../../lib/atoms/user";
import useControlTodoForm from "../../lib/hooks/useControlTodoForm";
import useCreateTodo from "../../lib/hooks/useCreateTodo";
import ToDoList from "./ToDoList";

interface IToDoListContainerProps {}

const Wrapper = styled.div`
  width: 100%;
`;

const FormWrapper = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 0.5rem;
`;

const TodolistWrapper = styled.div`
  display: flex;
`;

const ToDoListContainer = () => {
  const {
    setTitle,
    setContent,
    title,
    content,
    handleContentChange,
    handleTitleChange
  } = useControlTodoForm();
  const [isTitle, setIsTitle] = useState<null | boolean>(null);
  const { token } = useRecoilValue(userState);
  const { mutate } = useCreateTodo();

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      setIsTitle(false);
      return;
    }
    setIsTitle(null);

    mutate(
      {
        title,
        content
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        }
      }
    );
  };

  return (
    <Wrapper>
      {!token && <h1>로그인을 해주세요.</h1>}
      {token && (
        <>
          <FormWrapper>
            <FormContainer onSubmit={handleTodo}>
              <FormContainer.Label htmlFor="title">제목</FormContainer.Label>
              <FormContainer.Input
                type="text"
                id="title"
                name="title"
                placeholder="할 일의 제목을 적어주세요."
                value={title}
                onChange={handleTitleChange}
              />
              {!isTitle && isTitle !== null && (
                <FormContainer.Label>
                  제목은 반드시 입력해야해요
                </FormContainer.Label>
              )}
              <FormContainer.Label htmlFor="content">내용</FormContainer.Label>
              <FormContainer.Textarea
                id="content"
                name="content"
                placeholder="할 일의 자세한 내용을 적어주세요."
                value={content}
                onChange={handleContentChange}
              ></FormContainer.Textarea>
              <FormContainer.Button>할 일 만들기</FormContainer.Button>
            </FormContainer>
          </FormWrapper>
          <TodolistWrapper>
            <ToDoList />
            <Outlet />
          </TodolistWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ToDoListContainer;
