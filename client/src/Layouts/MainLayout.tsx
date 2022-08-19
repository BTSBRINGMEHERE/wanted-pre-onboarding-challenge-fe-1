import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/Components";
import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const MainLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default MainLayout;
