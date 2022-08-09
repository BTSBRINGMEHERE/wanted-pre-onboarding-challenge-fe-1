import React from "react";
import styled from "styled-components";

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

interface IFormContainerProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

const FormContainer = ({ ...props }: IFormContainerProps) => {
  return <Form {...props}>{props.children}</Form>;
};

FormContainer.Label = ({ ...props }) => {
  return <Label {...props}>{props.childrend}</Label>;
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
