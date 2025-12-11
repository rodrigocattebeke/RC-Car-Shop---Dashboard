import React, { useState } from "react";
import styles from "./FormModal.module.css";
import { FormInput } from "../formInput/FormInput";
import { Button } from "../../button/Button";
/**
 *
 * @param {Object} params
 * @param {function} params.onSubmit
 * @param {function} params.onCancel
 * @param {string} params.addItemText,
 * @param {string} params.itemName
 * @param {string} params.itemDescription
 * @param {boolean} params.showModal
 * @returns
 */

export const FormModal = ({ onSubmit, onCancel, addItemText = "", itemName, itemDescription, showModal = false }) => {
  const [itemN, setItemN] = useState(itemName || "");
  const [itemDesc, setItemDesc] = useState(itemDescription || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <div className={`${styles.modalContainer} ${showModal ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <h2>{addItemText}</h2>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div>
            <p>Nombre</p>
            <FormInput
              label="Nombre"
              name="item"
              value={itemN}
              placeholder="Ingresa el nombre del ítem"
              onChange={(e) => {
                setItemN(e.target.value);
              }}
              required={true}
            />
          </div>
          <div>
            <p>Descripción</p>
            <FormInput
              label="Descripción"
              name="description"
              value={itemDesc}
              placeholder="Ingresa la descripción del ítem"
              onChange={(e) => {
                setItemDesc(e.target.value);
              }}
            />
          </div>
          <div className={styles.modalButtons}>
            <Button mode="secondary" children="Cancelar" fullWidth="true" onClick={onCancel} />
            <Button mode="primary" children="Guardar" fullWidth="true" />
          </div>
        </form>
      </div>
    </div>
  );
};
