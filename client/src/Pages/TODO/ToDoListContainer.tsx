import React from "react";
import styled from "styled-components";
import ToDoList from "./ToDoList";

interface IToDoListContainerProps {}

const Wrapper = styled.div``;

const ToDoListContainer = () => {
  return (
    <Wrapper>
      <ToDoList />
    </Wrapper>
  );
};

export default ToDoListContainer;
