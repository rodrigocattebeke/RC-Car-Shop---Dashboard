import { uploadProductService } from "@/services/products/productsService";
import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadProduct = async (formData) => {
    setLoading(true);

    const res = await uploadProductService(formData);

    if (res.ok) {
      setProducts((prev) => ({ ...prev, [res.id]: { id: res.id, ...res.product } }));
    }

    setLoading(false);
    return res;
  };

  const state = {
    products,
    loading,
    uploadProduct,
  };

  return <ProductsContext.Provider value={state}>{children}</ProductsContext.Provider>;
};
