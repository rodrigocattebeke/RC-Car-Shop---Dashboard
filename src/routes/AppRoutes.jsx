import { HomePage } from "@/pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes.js";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
    </Routes>
  );
};
