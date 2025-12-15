import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="container-xxl">
      <Outlet />
    </main>
  );
};
