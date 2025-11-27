import { Header } from "@/components/layout/header/Header";
import product from "@/dev/product.json";
import { ProductView } from "./components/productView/ProductView";

export const ProductPage = () => {
  return (
    <>
      <Header title="Detalles del producto" />
      <ProductView product={product} />
    </>
  );
};
