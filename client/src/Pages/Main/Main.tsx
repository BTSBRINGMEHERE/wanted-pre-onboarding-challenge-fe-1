import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isReadable } from "stream";
import Snackbar from "../../Components/Snackbar/Snackbar";
import { snackbarState } from "../../lib/atoms/snackbar";
import { userState } from "../../lib/atoms/user";
import ToDoListContainer from "../TODO/ToDoListContainer";

interface IMainProps {}

const Main = () => {
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(userState);
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [isLogin]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setSnackbarQueue([]), 6000);
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

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
