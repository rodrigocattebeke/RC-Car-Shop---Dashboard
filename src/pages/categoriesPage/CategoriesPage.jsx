import { PageHeader } from "@/components/layout/pageHeader/PageHeader";
import React, { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.css";
import { FormInput } from "@/components/ui/form/formInput/FormInput";
import { Button } from "@/components/ui/button/Button";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import DeleteIcon from "@/assets/svg/delete.svg?react";
import EditIcon from "@/assets/svg/edit.svg?react";
import categories from "@/dev/categories.json";
import { FormModal } from "@/components/ui/form/formModal/FormModal";

const emptyCategory = {
  name: "",
  description: "",
};

export const CategoriesPage = () => {
  const [form, setForm] = useState(emptyCategory);

  const [filterResult, setFilterResult] = useState(categories);
  const [showModal, setShowModal] = useState(false);
  const [categoryEdited, setCategoryEdited] = useState(emptyCategory);

  // Handle Input

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //   Handle Search
  const handleSearchBar = (value) => {
    const val = value.toLowerCase();
    const res = categories.filter((category) => category.name.toLowerCase().includes(val));
    setFilterResult(res);
  };

  // Modal
  const handleShowModal = (category) => {
    const { name, description } = category;
    setCategoryEdited({ name, description });
    setShowModal(true);
  };

  const handleModalSubmit = (item) => {
    console.log(item);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <PageHeader title="Categorias" />
      {/* Add Category */}
      <section className={`${styles.section} ${styles.addCategorySection}`}>
        <p>Maneja todas las categorias de RC Car Shop</p>
        <div>
          <h2>Agregar nueva categoría</h2>
          <form className={styles.form}>
            <div className={styles.inputContainer}>
              <p>Nombre de la categoría</p>
              <FormInput name="category" value={form.category} onChange={onInputChange} placeholder="Ej: Limpieza" required={true} />
            </div>
            <div className={styles.inputContainer}>
              <p>Descripción de la categoría</p>
              <FormInput name="category" value={form.description} onChange={onInputChange} placeholder="Ej: Lo mejor para el lavado de vehiculos" required={true} />
            </div>
            <div className={styles.buttonContainer}>
              <Button mode="primary" children="Agregar categoría" fullWidth={true} />
            </div>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className={`${styles.section} ${styles.categoriesSection}`}>
        <SearchBar mode="secondary" onSearch={handleSearchBar} />
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <tbody>
              {filterResult.map((category, i) => (
                <tr key={i}>
                  <td>{category.name}</td>
                  <td className={styles.tableItemActions}>
                    <EditIcon
                      onClick={() => {
                        handleShowModal(category);
                      }}
                    />
                    <DeleteIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Edit category modal */}
      {showModal && <FormModal addItemText="Editar categoría" itemName={categoryEdited.name} itemDescription={categoryEdited.description} onSubmit={handleModalSubmit} onCancel={handleModalClose} showModal={showModal} />}
    </>
  );
};
