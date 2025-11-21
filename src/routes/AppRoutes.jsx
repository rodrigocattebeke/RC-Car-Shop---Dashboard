import { HomePage } from "@/pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
    </Routes>
  );
};
