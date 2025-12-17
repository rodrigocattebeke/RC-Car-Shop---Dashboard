import { ProductsContext } from "@/contexts/ProductsContext";
import { useContext } from "react";

export const useProducts = () => {
  return useContext(ProductsContext);
};
