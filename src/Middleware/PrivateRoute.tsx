import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('sims-ppob-tkn') as string;
  return token ? children : <Navigate to="/" replace />;
};
export const TokenCheck = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem('sims-ppob-tkn') as string;
  return !token ? children : <Navigate to="/dashboard" replace />;
};