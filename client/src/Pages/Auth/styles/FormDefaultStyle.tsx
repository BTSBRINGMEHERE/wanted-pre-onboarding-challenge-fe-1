import { FormContainer } from "@/Components";
import styled from "styled-components";
import { buttonAbled, buttonDisabled } from "./FormButtonStyled";

export const AuthTitleLabel = styled(FormContainer.Label)`
  ${({ theme }) => theme.mixin.label(theme)};
`;

interface StyledInputProps {
  isValidate: boolean;
}

export const AuthInput = styled(({ isValidate, ...parentsProps }) => (
  <FormContainer.Input {...parentsProps} />
))<StyledInputProps>`
  ${({ theme }) => theme.mixin.input(theme)};
`;

export const AuthButton = styled(FormContainer.Button)`
  ${({ theme }) => theme.mixin.button(theme)};
  width: 100%;
  margin: 1rem auto;
  ${({ disabled }) => (disabled ? buttonDisabled : buttonAbled)}
`;
