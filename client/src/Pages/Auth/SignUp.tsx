import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useValidation, useSignup, useSetUserState } from "./hooks";
import { FormContainer } from "@/Components";
import { AuthButton, AuthInput, AuthTitleLabel, ErrorLabel } from "./styles";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
  justify-content: center;
  align-items: center;
  form {
    ${({ theme }) => theme.mixin.form()}
    width: 80%;
  }
  textarea {
    ${({ theme }) => theme.mixin.textarea()}
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const { setLocalStorage, setUserState } = useSetUserState();
  const { data, mutate: signupMutate, isSuccess } = useSignup();
  const {
    email,
    isEmail,
    password,
    isPassword,
    password2,
    isPassword2,
    onEmailChange,
    onPassword2Change,
    onPasswordChange
  } = useValidation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { email, password };
    signupMutate(body);
  };

  useEffect(() => {
    if (isEmail && isPassword && isPassword2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isEmail, isPassword, isPassword2]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess) {
      setLocalStorage(data.token);
      setUserState({ isLogin: true, token: data.token });
      timer = setTimeout(() => navigate("/"), 3000);
    }

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Wrapper>
      <FormContainer onSubmit={onSubmit}>
        <AuthTitleLabel htmlFor="email">이메일</AuthTitleLabel>
        <AuthInput
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일을 입력하세요."
        />
        {isEmail !== null && !isEmail && (
          <ErrorLabel role="alert">이메일이 아닙니다.</ErrorLabel>
        )}
        <AuthTitleLabel htmlFor="password">비밀번호</AuthTitleLabel>
        <AuthInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호를 입력하세요"
        />
        {isPassword !== null && !isPassword && (
          <ErrorLabel role="alert">비밀번호는 8자 이상이어야합니다.</ErrorLabel>
        )}
        <AuthTitleLabel htmlFor="password2">비밀번호 확인</AuthTitleLabel>
        <AuthInput
          type="password"
          id="password2"
          name="password2"
          value={password2}
          onChange={onPassword2Change}
          placeholder="앞에서 입력한 비밀번호를 한 번 더 입력하세요."
        />
        {isPassword2 !== null && !isPassword2 && (
          <ErrorLabel role="alert">
            앞에서 입력한 비밀번호와 다릅니다.
          </ErrorLabel>
        )}
        <AuthButton disabled={isDisabled}>가입하기</AuthButton>
      </FormContainer>
    </Wrapper>
  );
};

export default SignUp;
