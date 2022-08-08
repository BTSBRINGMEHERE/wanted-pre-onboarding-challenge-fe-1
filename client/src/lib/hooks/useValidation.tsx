import React, { useState } from "react";

interface IuseValidationProps {}

const useValidation = () => {
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [password2, setPassword2] = useState("");
  const [isPassword2, setIsPassword2] = useState<boolean | null>(null);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const check = value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (check === null) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }

    setEmail(value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const check = value.length >= 8;

    if (check) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }

    setPassword(value);
  };

  const onPassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const check = value === password;

    if (check) {
      setIsPassword2(true);
    } else {
      setIsPassword2(false);
    }

    setPassword2(value);
  };

  return {
    email,
    isEmail,
    password,
    isPassword,
    password2,
    isPassword2,
    onEmailChange,
    onPasswordChange,
    onPassword2Change
  };
};

export default useValidation;
