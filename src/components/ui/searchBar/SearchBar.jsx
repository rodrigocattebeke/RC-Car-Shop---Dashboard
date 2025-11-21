"use client";
import { Search } from "@/components/icons/Search";
import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";

export const SearchBar = ({ onSearch, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSearch(inputValue);
  };

  useEffect(() => {
    if (onInputChange) {
      if (typeof onInputChange !== "function") return console.error("El onInputChange pasado debe de ser una función.");
      onInputChange(inputValue);
    }
  }, [inputValue, onInputChange]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchIconContainer}>
        <label htmlFor="search" onClick={() => onSearch(inputValue)}>
          <Search />
        </label>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="search"
          id="search"
          value={inputValue}
          placeholder="Buscar"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input>
      </form>
    </div>
  );
};
