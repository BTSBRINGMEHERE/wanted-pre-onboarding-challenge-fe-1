import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormContainer from "../../Components/FormContainer";
import useLogin from "../../lib/hooks/useLogin";
import useSetUserState from "../../lib/hooks/useSetUserState";
import useValidation from "../../lib/hooks/useValidation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  margin: 0 auto;
  form {
    ${({ theme }) => theme.mixin.form()}
    width: 80%;
  }
  input {
    ${({ theme }) => theme.mixin.input()}
  }
  label {
    ${({ theme }) => theme.mixin.label(theme)}
  }
`;

const Button = styled(FormContainer.Button)`
  ${({ theme }) => theme.mixin.button(theme)};
  width: 100%;
  margin: 1rem auto;
  &:hover {
    color: ${({ theme }) => theme.color.fontSecond};
    border: 1px solid ${({ theme }) => theme.color.main};
    background-color: ${({ theme }) => theme.color.main};
  }
`;

interface ILoginProps {}

const Login = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const { setLocalStorage, setUserState } = useSetUserState();
  const {
    email,
    password,
    isEmail,
    isPassword,
    onEmailChange,
    onPasswordChange
  } = useValidation();
  const { isSuccess, mutate } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email, password };

    mutate(body, {
      onSuccess: ({ token }) => {
        setLocalStorage(token);
        setUserState((pre) => ({ ...pre, isLogin: false, token }));
      }
    });
  };

  useEffect(() => {
    if (isEmail && isPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isEmail, isPassword]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setUserState((pre) => ({ ...pre, isLogin: true }));
        navigate("/");
      }, 500);
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
          placeholder="이메일을 입력해주세요."
        />
        <FormContainer.Label htmlFor="password">비밀번호</FormContainer.Label>
        <FormContainer.Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <Button disabled={isDisabled}>로그인</Button>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
