import { HomePage } from "@/pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes.js";
import { ProductPage } from "@/pages/productPage/ProductPage";
import { AddProductPage } from "@/pages/addProductPage/AddProductPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.PRODUCT_PAGE} element={<ProductPage />} />
      <Route path={ROUTES.ADD_PRODUCT} element={<AddProductPage />} />
    </Routes>
  );
};
