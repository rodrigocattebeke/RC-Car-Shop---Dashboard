import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "@/components/ui/button/Button";
import { Add } from "@/components/icons/Add";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";

export const HomePage = () => {
  return (
    <>
      <section className={styles.headerSection}>
        <header className={styles.header}>
          <h1>Productos</h1>
          <div>
            <Button title="Agregar producto" mode="primary">
              <Add />
            </Button>
          </div>
        </header>
        <div>
          <SearchBar />
        </div>
      </section>
    </>
  );
};
