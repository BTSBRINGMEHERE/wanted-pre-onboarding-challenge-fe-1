import React, { useState } from "react";
import { FormContainer } from "@/Components";
import { useControlTodoForm, useCreateTodo } from "./hooks";
import {
  AuthButton,
  AuthInput,
  AuthTitleLabel,
  ErrorLabel
} from "@/Pages/Auth/styles";
import styled from "styled-components";

const FormWrapper = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 0.5rem;
  form {
    ${({ theme }) => theme.mixin.form()}
  }
  textarea {
    ${({ theme }) => theme.mixin.textarea()}
  }
`;

const ToDoCreateForm = () => {
  const { setTitle, setContent, title, content, handleContentChange } =
    useControlTodoForm();

  const [isTitle, setIsTitle] = useState<boolean | null>(null);
  const { mutate: createTodoMutate } = useCreateTodo();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
    setIsTitle(true);
    if (value === "") {
      setIsTitle(null);
      return;
    }
  };

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      setIsTitle(false);
      return;
    }
    setIsTitle(null);

    createTodoMutate(
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
    <FormWrapper>
      <FormContainer onSubmit={handleTodo}>
        <AuthTitleLabel htmlFor="title">제목</AuthTitleLabel>
        <AuthInput
          type="text"
          id="title"
          name="title"
          placeholder="할 일의 제목을 적어주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <ErrorLabel className="errorLabel" isError={isTitle} role="alert">
          제목은 반드시 입력해야해요
        </ErrorLabel>
        <AuthTitleLabel htmlFor="content">내용</AuthTitleLabel>
        <FormContainer.Textarea
          id="content"
          name="content"
          placeholder="할 일의 자세한 내용을 적어주세요."
          value={content}
          onChange={handleContentChange}
        ></FormContainer.Textarea>
        <AuthButton disabled={isTitle === null ? true : isTitle ? false : true}>
          할 일 만들기
        </AuthButton>
      </FormContainer>
    </FormWrapper>
  );
};

export default ToDoCreateForm;
