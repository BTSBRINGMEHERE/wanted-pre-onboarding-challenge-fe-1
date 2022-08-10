import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../lib/atoms/user";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  h1 {
    font-size: 5rem;
    font-weight: bold;
  }
`;

interface IPageNotFoundProps {}

const PageNotFound = () => {
  const params = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(userState);

  const authUrlList = ["auth/login", "auth/signup"];

  const checkAuthUrl = () => {
    for (let url of authUrlList) {
      if (url === params["*"]) {
        setIsAuth(true);
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    checkAuthUrl();

    if (isLogin && isAuth) {
      navigate("/");
    }

    timer = setTimeout(() => navigate("/"), 2500);

    return () => {
      setIsAuth(false);
      clearTimeout(timer);
    };
  }, [isLogin, isAuth]);

  return (
    <Wrapper>
      <h1>🥲 페이지를 찾을 수가 없네요</h1>
    </Wrapper>
  );
};

export default PageNotFound;
