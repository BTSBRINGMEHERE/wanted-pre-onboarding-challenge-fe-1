import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormContainer, DeleteModal } from "@/Components";
import {
  useControlTodoForm,
  useDeleteTodo,
  useGetTodoDetail,
  useModalContorl,
  useUpdateTodo
} from "@/lib/hooks";

const Wrapper = styled.div<{ isUpdate: boolean }>`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 33.8rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 3;
  color: ${({ isUpdate, theme }) =>
    isUpdate ? theme.color.fontSecond : theme.color.fontMain};
  form {
    ${({ theme }) => theme.mixin.form()}
  }
  input {
    ${({ theme }) => theme.mixin.input()}
  }
  label {
    ${({ theme }) => theme.mixin.label(theme)}
  }
  textarea {
    ${({ theme }) => theme.mixin.textarea()}
    height: 24rem;
    margin-bottom: 1rem;
  }
  input,
  textarea {
    box-sizing: border-box;
    padding: 0.7rem 0;
    color: ${({ isUpdate, theme }) =>
      isUpdate ? theme.color.fontSecond : theme.color.fontMain};
    background-color: unset;
    border-bottom: 1px solid #fff;
  }
  h4 {
    font-size: 2rem;
    font-weight: bolder;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlurContainer = styled.span<{ isUpdate: boolean }>`
  position: fixed;
  top: 0;
  height: 33.8rem;
  width: 100%;
  background-color: ${({ isUpdate }) =>
    isUpdate ? "rgba(24, 25, 24, 0.858)" : "rgba(255, 255, 255, 0.3)"};
  z-index: 1;
  backdrop-filter: blur(1rem);
`;

const ContentWrapper = styled.div`
  height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 0.8rem;
  p {
    word-break: break-all;
    font-size: 1.6rem;
  }
`;

const ButtonContainer = styled.div`
  button {
    cursor: pointer;
    background-color: unset;
    border: 0;
    font-size: 1.4rem;
    margin: 0 0.8rem;
  }

  .delete-button {
    color: ${({ theme }) => theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.main};
    border-radius: 0.2rem;
    padding: 0.2rem 0.8rem;

    &:hover {
      background-color: ${({ theme }) => theme.color.main};
      color: ${({ theme }) => theme.color.fontSecond};
    }
  }

  .update-button {
    padding: 0.2rem 0.8rem;
    color: ${({ theme }) => theme.color.second};
    border: 1px solid ${({ theme }) => theme.color.second};
    border-radius: 0.2rem;

    &:hover {
      background-color: ${({ theme }) => theme.color.second};
      color: ${({ theme }) => theme.color.fontSecond};
    }
  }
`;

const ToDoDetail = () => {
  const {
    title,
    content,
    setContent,
    setTitle,
    handleContentChange,
    handleTitleChange
  } = useControlTodoForm();
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const { todoId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useDeleteTodo();
  const { mutate: updateMutate } = useUpdateTodo();
  const { data: todo } = useGetTodoDetail({ id: todoId ? todoId : "" });
  const { isModal, setIsModal, isConfirm, setIsConfirm, id, setId } =
    useModalContorl({});

  const handleDetailWindow = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate("/");
  };

  const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.closest("div")?.dataset.id;

    if (id) {
      setId(id);
      setIsModal(true);
    }
  };

  const handleUpdateItem = () => {
    if (todo?.id) {
      const id = todo.id;
      const body = { title, content };
      updateMutate(
        { id, body },
        {
          onSuccess: () => {
            setIsUpdate(false);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (isConfirm) {
      deleteMutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["todo"]);
            queryClient.invalidateQueries(["todoList"]);
            navigate("/");
          }
        }
      );
    }
  }, [isConfirm]);

  useEffect(() => {
    if (isUpdate && todo?.title && todo?.content) {
      setTitle(todo?.title);
      setContent(todo?.content);
    }
  }, [isUpdate, todo?.title, todo?.content]);

  return (
    <>
      {isModal && (
        <DeleteModal setIsConfirm={setIsConfirm} setIsModal={setIsModal} />
      )}
      <Wrapper
        className="item-wrapper"
        data-id={todo?.id}
        onDoubleClick={handleDetailWindow}
        isUpdate={isUpdate}
      >
        {!isUpdate ? (
          <>
            <h4>{todo?.title}</h4>
            <ContentWrapper>
              <p>{todo?.content}</p>
            </ContentWrapper>
            <Footer>
              <div>아이템을 끄려면 더블클릭하세요.</div>
              <ButtonContainer data-id={todo?.id}>
                <button className="delete-button" onClick={handleDeleteTodo}>
                  삭제
                </button>
                <button
                  className="update-button"
                  onClick={() => setIsUpdate(true)}
                >
                  수정
                </button>
              </ButtonContainer>
            </Footer>
          </>
        ) : (
          <>
            <FormContainer>
              <FormContainer.Input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력해주세요."
              />
              <FormContainer.Textarea
                id="content"
                name="content"
                value={content}
                onChange={handleContentChange}
              />
            </FormContainer>
            <Footer>
              <div>수정 사항을 입력하고 완료 버튼을 눌러주세요.</div>
              <ButtonContainer data-id={todo?.id}>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => setIsUpdate(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="update-button"
                  onClick={handleUpdateItem}
                >
                  완료
                </button>
              </ButtonContainer>
            </Footer>
          </>
        )}
      </Wrapper>
      <BlurContainer isUpdate={isUpdate} />
    </>
  );
};

export default ToDoDetail;
