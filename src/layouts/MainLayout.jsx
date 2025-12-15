import { NavBar } from "@/components/layout/navBar/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container-xxl">
        <Outlet />
      </main>
    </>
  );
};
