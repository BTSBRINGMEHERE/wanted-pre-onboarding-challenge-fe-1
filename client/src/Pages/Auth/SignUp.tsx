import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "../../lib/hooks/useValidation";
import useSignup from "../../lib/hooks/useSignup";
import useSetUserState from "../../lib/hooks/useSetUserState";
import FormContainer from "../../Components/FormContainer";
import styled from "styled-components";

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
  label {
    ${({ theme }) => theme.mixin.label(theme)}
  }
  input {
    ${({ theme }) => theme.mixin.input()}
  }
  textarea {
    ${({ theme }) => theme.mixin.textarea()}
  }
  button {
    ${({ theme }) => theme.mixin.button(theme)}
    margin: 1rem auto;
    width: 100%;
    &:hover {
      color: ${({ theme }) => theme.color.fontSecond};
      border: 1px solid ${({ theme }) => theme.color.main};
      background-color: ${({ theme }) => theme.color.main};
    }
  }
`;

interface ISignUpProps {}

const SignUp = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const { setLocalStorage, setUserState } = useSetUserState();
  const { data, mutate, isSuccess } = useSignup();
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
    mutate(body);
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
        <FormContainer.Label htmlFor="email">이메일</FormContainer.Label>
        <FormContainer.Input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일을 입력하세요."
        />
        {isEmail !== null && !isEmail && (
          <FormContainer.Label>올바른 이메일이 아닙니다.</FormContainer.Label>
        )}
        <FormContainer.Label htmlFor="password">비밀번호</FormContainer.Label>
        <FormContainer.Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호를 입력하세요"
        />
        {isPassword !== null && !isPassword && (
          <FormContainer.Label>
            비밀번호는 8자 이상이어야합니다.
          </FormContainer.Label>
        )}
        <FormContainer.Label htmlFor="password2">
          비밀번호 확인
        </FormContainer.Label>
        <FormContainer.Input
          type="password"
          id="password2"
          name="password2"
          value={password2}
          onChange={onPassword2Change}
          placeholder="앞에서 입력한 비밀번호를 한 번 더 입력하세요."
        />
        {isPassword2 !== null && !isPassword2 && (
          <FormContainer.Label>
            앞에서 입력한 비밀번호와 다릅니다.
          </FormContainer.Label>
        )}
        <FormContainer.Button disabled={isDisabled}>
          가입하기
        </FormContainer.Button>
      </FormContainer>
    </Wrapper>
  );
};

export default SignUp;
