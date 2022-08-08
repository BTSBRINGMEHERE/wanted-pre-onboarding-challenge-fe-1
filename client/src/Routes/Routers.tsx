import { Route, Routes } from "react-router-dom";
import MainLayout from "../Components/Layouts/MainLayout";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Main from "../Pages/Main/Main";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
