import styled from "styled-components";
import { FormContainer } from "@/Components";
import { useUpdateTodo } from "../hooks";

const Form = styled(FormContainer)`
  ${({ theme }) => theme.mixin.form()}
  height: 100%;
  input {
    ${({ theme }) => theme.mixin.input()}
  }
  label {
    ${({ theme }) => theme.mixin.label(theme)}
  }
  textarea {
    ${({ theme }) => theme.mixin.textarea()}
    height: 100%;
    margin-bottom: 1rem;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
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

interface TodoDetailData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface IToDoUpdateFormProps {
  todo: TodoDetailData;
  title: string;
  content: string;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToDoUpdateForm = ({
  todo,
  title,
  content,
  handleContentChange,
  handleTitleChange,
  setIsUpdate
}: IToDoUpdateFormProps) => {
  const { mutate: updateMutate } = useUpdateTodo();

  const handleUpdateItem = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
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

  return (
    <>
      <Form onSubmit={handleUpdateItem}>
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
      </Form>
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
  );
};

export default ToDoUpdateForm;
