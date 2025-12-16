import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="container-xxl min-vh-100 d-flex align-items-center justify-content-center">
      <Outlet />
    </main>
  );
};
