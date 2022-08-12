import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DeleteAlertModal from "../../Components/Modals/DeleteModal";
import useDeleteTodo from "../../lib/hooks/useDeleteTodo";
import useGetLocalDate from "../../lib/hooks/useGetLocalDate";
import useModalContorl from "../../lib/hooks/useModalContorl";

const Todo = styled.li<{ todoId: boolean }>`
  cursor: pointer;
  border: 1px solid
    ${({ todoId, theme }) => (todoId ? theme.color.main : "#d2d2d2")};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: ${({ theme }) => theme.color.fontMain};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.main};
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
  font-size: 1.4rem;
  color: #d2d2d2;
`;

const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0.2rem 0.4rem;
    border: 1px solid ${({ theme }) => theme.color.main};
    border-radius: 0.2rem;
    background-color: unset;
    color: ${({ theme }) => theme.color.main};
    &:hover {
      background-color: ${({ theme }) => theme.color.main};
      color: ${({ theme }) => theme.color.fontSecond};
    }
  }
`;

interface IToDoItemProps {
  todo: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ToDoItem = ({ todo }: IToDoItemProps) => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const { mutate: deleteMutate } = useDeleteTodo();
  const { id, setId, isModal, setIsModal, isConfirm, setIsConfirm } =
    useModalContorl({});

  const { handleUTCTimeToLocalTime } = useGetLocalDate();

  const handleRedirectPage = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;
    if (todoId === id) {
      navigate(`/`, { replace: true });
    } else {
      navigate(`/${id}`, { replace: true });
    }
  };

  const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.closest("li")?.dataset.id;
    if (id) {
      setId(id);
      setIsModal(true);
    }
  };

  useEffect(() => {
    if (isConfirm) {
      deleteMutate(
        { id },
        {
          onSuccess: () => {
            setIsModal(false);
            navigate("/");
          }
        }
      );
    }
  }, [isConfirm]);

  return (
    <>
      {isModal && (
        <DeleteAlertModal setIsModal={setIsModal} setIsConfirm={setIsConfirm} />
      )}
      <Todo
        data-id={todo.id}
        onClick={handleRedirectPage}
        todoId={todoId === todo.id ? true : false}
      >
        <Header>
          <h3>{todo.title}</h3>
        </Header>
        <ControlWrapper>
          <InfoContinaer>
            {handleUTCTimeToLocalTime(todo.createdAt)}
          </InfoContinaer>
          <ButtonContainer>
            <button onClick={handleDeleteTodo}>삭제</button>
          </ButtonContainer>
        </ControlWrapper>
      </Todo>
    </>
  );
};

export default ToDoItem;
