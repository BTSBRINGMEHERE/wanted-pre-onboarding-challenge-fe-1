import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteModal } from "@/Components";
import { useModalContorl } from "@/lib/hooks";
import { useControlTodoForm, useDeleteTodo, useGetTodoDetail } from "../hooks";
import ToDoUpdateForm from "./ToDoUpdateForm";
import ToDoDetail from "./ToDoDetail";

const Wrapper = styled.div<{ isUpdate: boolean }>`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 40rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 3;
  color: ${({ isUpdate, theme }) =>
    isUpdate ? theme.color.fontSecond : theme.color.fontMain};
  input,
  textarea {
    box-sizing: border-box;
    padding: 0.7rem 0;
    color: ${({ isUpdate, theme }) =>
      isUpdate ? theme.color.fontSecond : theme.color.fontMain};
    background-color: unset;
    border-bottom: 1px solid #fff;
  }
  h4 {
    font-size: 2rem;
    font-weight: bolder;
    color: #fff;
  }
  p {
    color: #fff;
  }
`;

const BlurContainer = styled.span<{ isUpdate: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 40rem;
  width: 100%;
  background-color: ${({ isUpdate }) =>
    isUpdate ? "rgba(24, 25, 24, 0.858)" : "#000423cc"};
  z-index: 1;
  backdrop-filter: blur(1rem);
`;

const ToDoDetailContainer = () => {
  const {
    title,
    content,
    setContent,
    setTitle,
    handleContentChange,
    handleTitleChange
  } = useControlTodoForm();
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const { todoId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useDeleteTodo();
  const { data: todo } = useGetTodoDetail({ id: todoId ? todoId : "" });
  const { isModal, setIsModal, isConfirm, setIsConfirm, id, setId } =
    useModalContorl({});

  const handleDetailWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate("/");
  };

  const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.closest("div")?.dataset.id;

    if (id) {
      setId(id);
      setIsModal(true);
    }
  };

  useEffect(() => {
    if (isConfirm) {
      deleteMutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["todo"]);
            queryClient.invalidateQueries(["todoList"]);
            navigate("/");
          }
        }
      );
    }
  }, [isConfirm]);

  useEffect(() => {
    if (isUpdate && todo) {
      setTitle(todo?.title);
      setContent(todo?.content);
    }
  }, [isUpdate, todo?.title, todo?.content]);

  return (
    <>
      {isModal && (
        <DeleteModal setIsConfirm={setIsConfirm} setIsModal={setIsModal} />
      )}
      <Wrapper
        className="item-wrapper"
        data-id={todo?.id}
        onDoubleClick={handleDetailWindow}
        isUpdate={isUpdate}
      >
        {!isUpdate
          ? todo && (
              <ToDoDetail
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                setIsUpdate={setIsUpdate}
              />
            )
          : todo && (
              <ToDoUpdateForm
                todo={todo}
                title={title}
                content={content}
                handleContentChange={handleContentChange}
                handleTitleChange={handleTitleChange}
                setIsUpdate={setIsUpdate}
              />
            )}
      </Wrapper>
      <BlurContainer isUpdate={isUpdate} />
    </>
  );
};

export default ToDoDetailContainer;
