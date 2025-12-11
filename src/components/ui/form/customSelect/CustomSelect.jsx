import { useState } from "react";
import styles from "./CustomSelect.module.css";
import ArrowDownIcon from "@/assets/svg/arrow_down.svg?react";
import CloseIcon from "@/assets/svg/close.svg?react";
import { Button } from "@/components/ui/button/Button";
import { SearchBar } from "@/components/ui/searchBar/SearchBar";
import { FormInput } from "@/components/ui/form/formInput/FormInput";
import { FormModal } from "../formModal/FormModal";

export const CustomSelect = ({ name = "", options = [], value = "Selecciona una opción", addItemText = "", onOptionSelect, onAddNewItem, ...props }) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!onOptionSelect || typeof onOptionSelect !== "function") return console.warn("Se debe de pasar una función onOptionSelected");

  const handleOptionSelected = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    onOptionSelect(option);
  };

  // Modal functions
  const handleCancelModal = () => {
    setItemName("");
    setItemDescription("");
    setShowModal(false);
  };

  const handleAddNewItem = () => {
    onAddNewItem();
  };

  return (
    <>
      <div className={styles.selectContainer} name={name} value={selectedOption} {...props}>
        <div className={styles.optionSelectedContainer} onClick={() => setShowDropdown(!showDropdown)}>
          <p>{selectedOption}</p>
          <ArrowDownIcon className={styles.arrowIcon} />
        </div>

        {/* Options Dropdown */}
        <div className={`${styles.optionsDropdown} ${showDropdown ? styles.show : ""}`}>
          <div className={styles.optionsDropdownContent}>
            <div className={styles.closeDropdown}>
              <CloseIcon onClick={() => setShowDropdown(false)} />
            </div>
            <div className={styles.searchBarContainer}>
              <SearchBar mode="secondary" />
            </div>
            <div className={styles.optionsContainer}>
              {options.length == 0 ? (
                <p onClick={() => setShowModal(true)}>Agrega un nuevo ítem para comenzar</p>
              ) : (
                options.map((option, i) => (
                  <p onClick={() => handleOptionSelected(option)} key={i}>
                    {option}
                  </p>
                ))
              )}
            </div>
            <div className={styles.actionButtonsContainer}>
              <Button children={addItemText} mode="primary" fullWidth="true" onClick={() => setShowModal(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Add new item modal */}
      <FormModal showModal={showModal} addItemText={addItemText} onSubmit={handleAddNewItem} onCancel={handleCancelModal} />
    </>
  );
};
