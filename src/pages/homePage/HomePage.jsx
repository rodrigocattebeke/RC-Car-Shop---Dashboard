import React, { useState } from "react";
import styles from "./HomePage.module.css";
import { Button } from "@/components/ui/button/Button";
import { Add } from "@/components/icons/Add";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import { ProductList } from "./components/productList/ProductList";
import { FILTERS, FILTERS_LABELS } from "@/constants/filters.js";
import tempProducts from "@/dev/products.json";

export const HomePage = () => {
  const [filterSelected, setFilterSelected] = useState(FILTERS.ALL); //ALL is the default filter

  const handleFilter = (filter) => {
    setFilterSelected(filter);
  };

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
        <div className={styles.filterBar}>
          <ul>
            {Object.values(FILTERS).map((filter, i) => (
              <li className={`${styles.filterOption} ${filter == filterSelected ? styles.active : ""}`} onClick={() => handleFilter(filter)} key={i}>
                {FILTERS_LABELS[filter]}
              </li>
            ))}
          </ul>
        </div>
        <ProductList products={tempProducts} />
      </section>
    </>
  );
};
