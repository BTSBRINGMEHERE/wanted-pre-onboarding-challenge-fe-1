import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../lib/hooks/useLogin";
import useSetUserState from "../../lib/hooks/useSetUserState";
import useValidation from "../../lib/hooks/useValidation";

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
      onSuccess: ({ message, token }) => {
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
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <form onSubmit={onSubmit}>
      <label id="email">이메일</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={onEmailChange}
      />
      <label id="password">비밀번호</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button disabled={isDisabled}>로그인</button>
    </form>
  );
};

export default Login;
