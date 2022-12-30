import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { useAppSelector } from "../../features/hooks";

type ProtectedComponent = {
  children: JSX.Element;
};

const ProtectedComponent = ({ children }: ProtectedComponent) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedComponent;
