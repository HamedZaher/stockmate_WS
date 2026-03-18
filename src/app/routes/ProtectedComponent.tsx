import React, { ReactNode } from "react";
import { useNavigate } from "react-router";

const ProtectedComponent = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("login");
  }
  return <>{children}</>;
};

export default ProtectedComponent;
