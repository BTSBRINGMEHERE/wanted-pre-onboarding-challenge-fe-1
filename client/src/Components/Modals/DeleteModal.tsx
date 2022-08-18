import React from "react";
import styled from "styled-components";
import { Modal } from "@/Components";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  width: 45rem;
  height: 20rem;

  header {
    h1 {
      font-size: 4rem;
      font-weight: 900;
    }
  }

  main {
    height: 100%;
    p {
      font-size: 1.8rem;
    }
  }

  footer {
    align-self: flex-end;
    button {
      background-color: unset;
      border: 0;
      font-size: 1.8rem;
      ${({ theme }) => theme.mixin.button(theme)};
      padding: 0.5rem 0.8rem;
      color: ${({ theme }) => theme.color.gray};
      border-radius: 0.2rem;
      &.cancel-button {
        border: 1px solid ${({ theme }) => theme.color.second};
        color: ${({ theme }) => theme.color.second};
        background-color: unset;
        &:hover {
          color: ${({ theme }) => theme.color.fontSecond};
          background-color: ${({ theme }) => theme.color.second};
        }
      }
      &.confirm-button {
        margin-left: 0.8rem;
        border: 1px solid ${({ theme }) => theme.color.main};
        color: ${({ theme }) => theme.color.main};
        background-color: unset;
        &:hover {
          color: ${({ theme }) => theme.color.fontSecond};
          background-color: ${({ theme }) => theme.color.main};
        }
      }
    }
  }
`;

interface IDeleteAlertModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAlertModal = ({
  setIsModal,
  setIsConfirm
}: IDeleteAlertModalProps) => {
  return (
    <Modal>
      <ModalContainer>
        <header>
          <h1>할 일을 다 마치셨나요?</h1>
        </header>
        <main>
          <p>다 끝난 일인가요? 삭제하면 복구할 수 없어요!</p>
        </main>
        <footer>
          <button className="cancel-button" onClick={() => setIsModal(false)}>
            취소
          </button>
          <button
            className="confirm-button"
            onClick={() => {
              setIsConfirm(true);
            }}
          >
            삭제
          </button>
        </footer>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteAlertModal;
