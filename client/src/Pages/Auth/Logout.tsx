import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRemoveUserState } from "./hooks";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  h1 {
    font-size: 3rem;
    font-weight: 900;
  }
`;

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

  return (
    <Wrapper>
      <h1>🤣 다음에 또 만나요!</h1>
    </Wrapper>
  );
};

export default Logout;
