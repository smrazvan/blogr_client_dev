import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../features/hooks";

type ProtectedComponent = {
  children: React.ReactNode;
};

const ProtectedComponent = ({ children }: ProtectedComponent) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  return <div onClick={(e) => handleClick(e)}>{children}</div>;
};

export default ProtectedComponent;
