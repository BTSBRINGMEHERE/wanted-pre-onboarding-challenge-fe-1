import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useDeleteTodo from "../../lib/hooks/useDeleteTodo";
import useGetTodoDetail from "../../lib/hooks/useGetTodoDetail";

const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  height: 47%;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 2;
  h4 {
    font-size: 2rem;
    font-weight: bolder;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BlurContainer = styled.span`
  position: fixed;
  top: 0;
  height: 47%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 1;
  backdrop-filter: blur(1rem);
`;

const ContentWrapper = styled.div`
  height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 0.8rem;
  p {
    word-break: break-all;
    font-size: 1.6rem;
  }
`;

const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    background-color: unset;
    border: 0;
    font-size: 1.4rem;
    margin: 0 0.8rem;
  }

  .delete-button {
    color: ${({ theme }) => theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.main};
    border-radius: 0.2rem;
    padding: 0.2rem 0.8rem;

    &:hover {
      background-color: ${({ theme }) => theme.color.main};
      color: ${({ theme }) => theme.color.fontSecond};
    }
  }

  .update-button {
    padding: 0.2rem 0.8rem;
    color: ${({ theme }) => theme.color.second};
    border: 1px solid ${({ theme }) => theme.color.second};
    border-radius: 0.2rem;

    &:hover {
      background-color: ${({ theme }) => theme.color.second};
      color: ${({ theme }) => theme.color.fontSecond};
    }
  }
`;

const ToDoDetail = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useDeleteTodo();
  const { data: todo } = useGetTodoDetail({ id: todoId ? todoId : "" });

  const handleDetailWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate("/");
  };

  const handleDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.closest("div")?.dataset.id;

    if (id) {
      deleteMutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["todo"]);
            queryClient.invalidateQueries(["todoList"]);
            navigate("/");
          },
        },
      );
    }
  };

  const handleUpdateItem = () => {};

  return (
    <>
      <Wrapper
        className="item-wrapper"
        data-id={todo?.id}
        onDoubleClick={handleDetailWindow}
      >
        ㄴ<h4>{todo?.title}</h4>
        <ContentWrapper>
          <p>{todo?.content}</p>
        </ContentWrapper>
        <Footer>
          <div>아이템을 끄려면 더블클릭하세요.</div>
          <ButtonContainer data-id={todo?.id}>
            <button className="delete-button" onClick={handleDeleteItem}>
              삭제
            </button>
            <button className="update-button" onClick={handleUpdateItem}>
              수정
            </button>
          </ButtonContainer>
        </Footer>
      </Wrapper>
      <BlurContainer />
    </>
  );
};

export default ToDoDetail;
