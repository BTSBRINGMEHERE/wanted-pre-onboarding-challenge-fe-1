import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IPageNotFoundProps {}

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => navigate("/"), 3000);

    return () => clearTimeout(timer);
  }, []);

  return <div>페이지를 찾을 수가 없네요</div>;
};

export default PageNotFound;
