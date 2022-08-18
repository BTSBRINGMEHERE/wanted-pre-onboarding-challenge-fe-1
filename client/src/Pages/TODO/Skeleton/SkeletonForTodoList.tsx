import { SkeletonForTodoListItem } from "@/Pages";

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
