import { PageHeader } from "@/components/layout/pageHeader/PageHeader";
import product from "@/dev/product.json";
import { ProductView } from "./components/productView/ProductView";

export const ProductPage = () => {
  return (
    <>
      <PageHeader title="Detalles del producto" />
      <ProductView product={product} />
    </>
  );
};
