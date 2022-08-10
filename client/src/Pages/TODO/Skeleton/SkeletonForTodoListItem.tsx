import React from "react";
import styled, { keyframes } from "styled-components";

const loading = keyframes`
  0%{
    transform: translateX(0);
  }
  50%, 100%{
    transform: translateX(100vw);
  }
`;

const Todo = styled.li`
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.gray};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  height: 100%;
`;

const TitleBox = styled.div`
  position: relative;
  width: 100%;
  height: 2.2rem;
  background-color: ${({ theme }) => theme.color.gray};
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: inherit;
    background: linear-gradient(to right, #d0d0d0, #fff, #d0d0d0);
    animation: ${loading} 1.5s infinite linear;
  }
`;

const ButtonBox = styled.div`
  position: relative;
  width: 3.4rem;
  height: 2.4rem;
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.color.gray};
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: inherit;
    background: linear-gradient(to right, #d0d0d0, #fff, #d0d0d0);
    animation: ${loading} 1.5s infinite linear;
  }
`;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  h3 {
    font-size: 1.8rem;
  }
`;

const InfoContinaer = styled.div`
  position: relative;
  width: 5.5rem;
  height: 1.7rem;
  background-color: ${({ theme }) => theme.color.gray};
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 3rem;
    height: inherit;
    background: linear-gradient(to right, #d0d0d0, #fff, #d0d0d0);
    animation: ${loading} 1.5s infinite linear;
  }
`;

const ButtonContainer = styled.div``;

interface ISkeletonForTodoListItemProps {}

const SkeletonForTodoListItem = () => {
  return (
    <Todo>
      <Header>
        <TitleBox />
      </Header>
      <ControlWrapper>
        <InfoContinaer />
        <ButtonContainer>
          <ButtonBox />
        </ButtonContainer>
      </ControlWrapper>
    </Todo>
  );
};

export default SkeletonForTodoListItem;
