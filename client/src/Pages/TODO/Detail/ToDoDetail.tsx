import styled from "styled-components";

const ContentWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 0.8rem;
  height: 100%;
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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

interface TodoDetailData {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface IToDoDetailProps {
  todo: TodoDetailData;
  handleDeleteTodo: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToDoDetail = ({
  todo,
  handleDeleteTodo,
  setIsUpdate
}: IToDoDetailProps) => {
  return (
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
          <button className="update-button" onClick={() => setIsUpdate(true)}>
            수정
          </button>
        </ButtonContainer>
      </Footer>
    </>
  );
};

export default ToDoDetail;
