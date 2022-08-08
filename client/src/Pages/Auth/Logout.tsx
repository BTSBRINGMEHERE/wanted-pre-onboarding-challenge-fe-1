import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRemoveUserState from "../../lib/hooks/useRemoveUserState";

interface ILogoutProps {}

const Logout = () => {
  const navigate = useNavigate();
  const { removeLocalStorage, setUserState } = useRemoveUserState();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      removeLocalStorage();
      setUserState({ isLogin: false, token: "" });
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <h1>다음에 또 만나요!</h1>;
};

export default Logout;
