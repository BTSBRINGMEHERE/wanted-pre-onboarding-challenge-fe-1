import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGetTodos from "../../lib/hooks/useGetTodos";
import SkeletonForTodoList from "./Skeleton/SkeletonForTodoList";
import ToDoItem from "./ToDoItem";

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const ToDoList = () => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const { data: todos, isLoading, isRefetching } = useGetTodos();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isLoading && !isRefetching) {
      timer = setTimeout(() => setIsSkeleton(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, isRefetching]);

  return (
    <Wrapper>
      {!isSkeleton ? (
        <ul>
          {todos?.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <SkeletonForTodoList />
      )}
    </Wrapper>
  );
};

export default ToDoList;
