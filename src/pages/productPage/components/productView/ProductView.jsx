import { formatCurrencyPY } from "@/helpers/formatCurrency";
import styles from "./ProductView.module.css";
import { FloatingMenu } from "../floatingMenu/FloatingMenu";

export const ProductView = ({ product }) => {
  return (
    <>
      <section className={styles.productSection}>
        <section className={`${styles.section} ${styles.imgWrapper}`}>
          <div className={styles.imgContainer}>
            <img src={product.imgURL} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.productInfo}`}>
          <p className={`${styles.title} ${styles.productTitle}`}>{product.title}</p>
          <p className={styles.productPrice}>{formatCurrencyPY(product.price)}</p>
          <div className={styles.dataContainer}>
            <p>Categoría:</p>
            <p>{product.category}</p>
          </div>
          <div className={styles.dataContainer}>
            <p>Stock:</p>
            <p>{product.stock}</p>
          </div>
          <div className={`${styles.productTags} ${styles.dataContainer}`}>
            <p>Tags:</p>
            <ul>
              {product.tags.map((tag, i) => (
                <li key={i}>{tag.toLowerCase()}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.productDescription}`}>
          <p className={styles.title}>Descripción</p>
          <p>{product.description}</p>
        </section>

        <section className={`${styles.section} ${styles.productMetadata}`}>
          <p className={styles.title}>Metadatos</p>
          <div className={styles.metadataContainer}>
            <div className={styles.dataContainer}>
              <p>Añadido el:</p>
              <p>123</p>
            </div>
            <div className={styles.dataContainer}>
              <p>Actualizado el:</p>
              <p>123</p>
            </div>
          </div>
        </section>
      </section>

      {/* Floating Button */}
      <FloatingMenu />
    </>
  );
};
