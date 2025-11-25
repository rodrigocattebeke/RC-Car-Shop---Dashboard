import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "@/components/ui/button/Button";
import { Add } from "@/components/icons/Add";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import { ProductList } from "./components/productList/ProductList";
import tempProducts from "@/dev/products.json";

export const HomePage = () => {
  return (
    <>
      <section className={styles.headerSection}>
        <div className={styles.header}>
          <h1>Productos</h1>
          <div>
            <Button title="Agregar producto" mode="primary">
              <Add />
            </Button>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </section>
      <section className={styles.productsSection}>
        <ProductList products={tempProducts} />
      </section>
    </>
  );
};
