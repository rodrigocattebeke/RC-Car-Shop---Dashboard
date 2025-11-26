import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ROUTES } from "@/constants/routes";
/**
 * @param {Object} params
 * @param {Object} params.product - Objeto de producto
 * @param {Integer} params.product.id - ID del producto
 * @param {String} params.product.title - Titulo del producto
 * @param {Number} params.products.product.price - Precio del producto
 * @param {String} params.product.brand - Marca
 * @param {Number} params.products.product.stock - Cantidad en stock
 * @param {String} params.product.category - Categoría
 * @param {String[]} params.product.tags - Lista de tags
 * @param {string} params.product.imgURL - URL de la imágen
 * @returns
 */

export const ProductCard = ({ product }) => {
  return (
    <Link to={`${ROUTES.PRODUCT}/${product.id}`} className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={product.imgURL} className={styles.img} alt={`Imagen del producto ${product.title}`}></img>
      </div>
      <div className={styles.body}>
        <div className={styles.description}>
          <p className={styles.title}>{product.title}</p>
          <p className={styles.price}>{product.price ? product.price.toLocaleString("es-PY") : 0} Gs</p>
        </div>
        <div className={styles.stock}>
          <p>Stock: {product.stock}</p>
        </div>
      </div>
    </Link>
  );
};
