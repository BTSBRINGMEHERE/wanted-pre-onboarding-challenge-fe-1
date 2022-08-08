import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../lib/atoms/user";

interface IHeaderProps {}

const Header = () => {
  const { isLogin } = useRecoilValue(userState);

  return (
    <header>
      <div>just do it!</div>

      <nav>
        {isLogin && <Link to="/auth/logout">로그아웃</Link>}
        {!isLogin && (
          <>
            <Link to="/auth/login">로그인</Link>
            <Link to="/auth/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
