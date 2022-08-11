import React from "react";
import SkeletonForTodoListItem from "./SkeletonForTodoListItem";

interface ISkeletonForTodoListProps {}

const SkeletonForTodoList = () => {
  return (
    <ul>
      <SkeletonForTodoListItem />
      <SkeletonForTodoListItem />
      <SkeletonForTodoListItem />
      <SkeletonForTodoListItem />
      <SkeletonForTodoListItem />
      <SkeletonForTodoListItem />
    </ul>
  );
};

export default SkeletonForTodoList;
