import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "@/lib/atoms";

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

const PageNotFound = () => {
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(userState);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => navigate("/"), 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [isLogin]);

  return (
    <Wrapper>
      <h1>🥲 페이지를 찾을 수가 없네요</h1>
    </Wrapper>
  );
};

export default PageNotFound;
