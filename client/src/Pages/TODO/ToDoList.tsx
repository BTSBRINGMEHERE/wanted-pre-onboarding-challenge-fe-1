import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGetTodos from "../../lib/hooks/useGetTodos";
import SkeletonForTodoListItem from "./Skeleton/SkeletonForTodoListItem";
import ToDoItem from "./ToDoItem";

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const ToDoList = () => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const { data: todos, isLoading, isSuccess, isRefetching } = useGetTodos();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && !isRefetching) {
      timer = setTimeout(() => setIsSkeleton(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, isRefetching]);

  return !isSkeleton ? (
    <Wrapper>
      <ul>
        {todos?.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </Wrapper>
  ) : (
    <Wrapper>
      <ul>
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
        <SkeletonForTodoListItem />
      </ul>
    </Wrapper>
  );
};

export default ToDoList;
