import { ProductCard } from "@/components/ui/product/productCard/ProductCard";
import styles from "./ProductList.module.css";

/**
 * @param {Object} params
 * @param {Object[]} params.products - Array de productos
 * @param {Object} params.products.product - Objeto de producto
 * @param {Integer} params.products.product.id - ID del producto
 * @param {String} params.products.product.title - Titulo del producto
 * @param {Number} params.products.product.price - Precio del producto
 * @param {Number} params.products.product.stock - Cantidad en stock
 * @param {String} params.products.product.brand - Marca
 * @param {String} params.products.product.category - Categoría
 * @param {String[]} params.products.product.tags - Lista de tags
 * @param {string} params.products.product.imgURL - URL de la imágen
 * @returns
 */

export const ProductList = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map((product, i) => (
        <ProductCard product={product} key={i} />
      ))}
    </div>
  );
};
