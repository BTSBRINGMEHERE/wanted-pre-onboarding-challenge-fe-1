import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;
const ContentBackground = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

interface IModalProps extends React.HTMLAttributes<HTMLElement> {}

const Modal = ({ ...props }: IModalProps) => {
  return (
    <ModalWrapper>
      <ContentContainer>{props.children}</ContentContainer>
      <ContentBackground />
    </ModalWrapper>
  );
};

export default Modal;
