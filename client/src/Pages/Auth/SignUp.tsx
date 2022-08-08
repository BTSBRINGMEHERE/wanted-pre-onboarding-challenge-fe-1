import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "../../lib/hooks/useValidation";
import useSignup from "../../lib/hooks/useSignup";
import useSetUserState from "../../lib/hooks/useSetUserState";

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
    <form onSubmit={onSubmit}>
      <label id="email">이메일</label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={onEmailChange}
      />
      {isEmail !== null && !isEmail && <label>올바른 이메일이 아닙니다.</label>}
      <label id="password">비밀번호</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
      />
      {isPassword !== null && !isPassword && (
        <label>비밀번호는 8자 이상이어야합니다.</label>
      )}
      <label id="password2">비밀번호 확인</label>
      <input
        type="password"
        id="password2"
        name="password2"
        value={password2}
        onChange={onPassword2Change}
      />
      {isPassword2 !== null && !isPassword2 && (
        <label>앞에서 입력한 비밀번호와 다릅니다.</label>
      )}
      <button disabled={isDisabled}>가입하기</button>
    </form>
  );
};

export default SignUp;
