import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../lib/atoms/user";
import ToDoListContainer from "../TODO/ToDoListContainer";

interface IMainProps {}

const Main = () => {
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(userState);

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [isLogin]);
  return (
    <>
      <ToDoListContainer />
    </>
  );
};

export default Main;
