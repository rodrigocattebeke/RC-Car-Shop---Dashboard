import { PageHeader } from "@/components/layout/pageHeader/PageHeader";
import { ProductForm } from "@/components/productForm/ProductForm";
import { Loader } from "@/components/ui/loader/Loader";
import { useProducts } from "@/hooks/useProducts";

export const AddProductPage = () => {
  const { uploadProduct, loading } = useProducts();

  const onSubmit = async (formData) => {
    const res = await uploadProduct(formData);
    return res;
  };
  return (
    <>
      <PageHeader title="Agregar producto" />
      <ProductForm onSubmit={onSubmit} />
      {loading && <Loader fullScreen={true} backdrop={true} />}
    </>
  );
};
