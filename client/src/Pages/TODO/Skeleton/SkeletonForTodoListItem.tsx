import React from "react";
import styled, { css, keyframes } from "styled-components";
import Skeleton from "../../../Components/Skeleton";

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

const TitleSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray};
`;

const ButtonSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray};
`;

const DateSkeleton = styled(Skeleton)``;

const Footer = styled.div`
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
  background-color: ${({ theme }) => theme.color.gray};
`;

const ButtonContainer = styled.div``;

interface ISkeletonForTodoListItemProps {}

const SkeletonForTodoListItem = () => {
  return (
    <Todo>
      <Header>
        <TitleSkeleton skeletonBoxHeight="2.2rem" skeletonBoxWidth="100%" />
      </Header>
      <Footer>
        <InfoContinaer>
          <DateSkeleton skeletonBoxHeight="1.7rem" skeletonBoxWidth="5.5rem" />
        </InfoContinaer>
        <ButtonContainer>
          <ButtonSkeleton
            skeletonBoxHeight="2.4rem"
            skeletonBoxWidth="3.4rem"
          />
        </ButtonContainer>
      </Footer>
    </Todo>
  );
};

export default SkeletonForTodoListItem;
