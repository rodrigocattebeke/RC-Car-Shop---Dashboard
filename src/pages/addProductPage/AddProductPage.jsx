import { PageHeader } from "@/components/layout/pageHeader/PageHeader";
import { ProductForm } from "@/components/productForm/ProductForm";

export const AddProductPage = () => {
  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <PageHeader title="Agregar producto" />
      <ProductForm onSubmit={onSubmit} />
    </>
  );
};
