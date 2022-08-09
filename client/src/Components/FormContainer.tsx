import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bolder;
  color: ${({ theme }) => theme.color.fontMain};
  margin-top: 1rem;
`;

const Input = styled.input`
  border: 0;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  outline: unset;
`;

const Textarea = styled.textarea`
  border: 0;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  resize: none;
  height: 15rem;
  outline: unset;
  &::placeholder {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 1rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 0.5rem;
  background-color: unset;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.main};
  align-self: flex-end;
  &:hover {
    color: ${({ theme }) => theme.color.fontSecond};
    background-color: ${({ theme }) => theme.color.main};
  }
`;

interface IFormContainerProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

const FormContainer = ({ ...props }: IFormContainerProps) => {
  return <Form {...props}>{props.children}</Form>;
};

FormContainer.Label = ({ ...props }) => {
  return <Label {...props}>{props.children}</Label>;
};

FormContainer.Input = ({ ...props }) => {
  return <Input {...props} />;
};

FormContainer.Textarea = ({ ...props }) => {
  return <Textarea {...props}>{props.children}</Textarea>;
};

FormContainer.Button = ({ ...props }) => {
  return <Button {...props}>{props.children}</Button>;
};

export default FormContainer;
