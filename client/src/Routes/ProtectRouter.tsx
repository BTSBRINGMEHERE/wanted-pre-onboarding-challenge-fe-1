import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProtectRouterProps {
  isAllow: boolean;
  redirectPath: string;
  children?: ReactElement;
}

const ProtectRouter = ({
  isAllow,
  redirectPath,
  children
}: IProtectRouterProps) => {
  if (!isAllow) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectRouter;
