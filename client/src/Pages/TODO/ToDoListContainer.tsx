import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ToDoList } from "@/Pages";
import ToDoCreateForm from "./ToDoCreateForm";

const Wrapper = styled.div`
  width: 100%;
  .errorLabel {
    color: ${({ theme }) => theme.color.main};
    font-size: 1.3rem;
  }
`;

const TodolistWrapper = styled.div`
  display: flex;
`;

const ToDoListContainer = () => {
  return (
    <>
      <Wrapper>
        <ToDoCreateForm />
        <TodolistWrapper>
          <ToDoList />
          <Outlet />
        </TodolistWrapper>
      </Wrapper>
    </>
  );
};

export default ToDoListContainer;
