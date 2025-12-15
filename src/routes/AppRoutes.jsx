import { HomePage } from "@/pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes.js";
import { ProductPage } from "@/pages/productPage/ProductPage";
import { AddProductPage } from "@/pages/addProductPage/AddProductPage";
import { CategoriesPage } from "@/pages/categoriesPage/CategoriesPage";
import { LoginPage } from "@/pages/loginPage/LoginPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.ADD_PRODUCT} element={<AddProductPage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PRODUCT_PAGE} element={<ProductPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
