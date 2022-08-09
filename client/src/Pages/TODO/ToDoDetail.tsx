import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetTodoDetail from "../../lib/hooks/useGetTodoDetail";

const Wrapper = styled.div``;

const ButtonContainer = styled.div``;

interface IToDoDetailProps {}

const ToDoDetail = () => {
  const { todoId } = useParams();
  const { data: todo } = useGetTodoDetail({ id: todoId ? todoId : "" });

  return (
    <Wrapper data-id={todo?.id}>
      <h4>{todo?.title}</h4>
      <p>{todo?.content}</p>
      <ButtonContainer>
        <button>삭제</button>
        <button>수정</button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ToDoDetail;
