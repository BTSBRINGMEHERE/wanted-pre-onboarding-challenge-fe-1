import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { snackbarState } from "../../lib/atoms/snackbar";
import { userState } from "../../lib/atoms/user";
import ToDoListContainer from "../TODO/ToDoListContainer";

interface IMainProps {}

const Main = () => {
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(userState);
  const snackbarQueue = useRecoilValue(snackbarState);

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [isLogin]);
  return (
    <>
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item key={id} data-set={id} message={message} type={type} />
        ))}
      </Snackbar>
      <ToDoListContainer />
    </>
  );
};

export default Main;
