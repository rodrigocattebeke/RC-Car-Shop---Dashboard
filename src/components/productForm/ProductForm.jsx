"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductForm.module.css";
import { ErrorTooltip } from "../ui/errorTooltip/ErrorTooltip";
// import { Modal } from "../ui/modal/Modal";
// import { ImageCropper } from "@/components/imageCropper/ImageCropper";
import { Button } from "@/components/ui/button/Button";
import { CustomSelect } from "@/components/ui/form/customSelect/CustomSelect";
import { FormInput } from "../ui/form/formInput/FormInput";
import { scrollTo } from "@/helpers/scrollTo";
import { ImageCropper } from "../imageCropper/ImageCropper";
import { useNavigate } from "react-router-dom";

const DEFAULT_VALUES = {
  title: "",
  imgURL: "",
  category: "",
  description: "",
  tags: "",
  price: "",
  stock: "",
  brand: "",
};

export const ProductForm = ({ initialValuesObject, onSubmit }) => {
  const initialValues = {
    ...DEFAULT_VALUES,
    ...initialValuesObject,
  };

  const EMPTY_ERRORS = {
    title: "",
    price: "",
    stock: "",
    category: "",
    tags: "",
  };

  const [brand, setBrand] = useState(initialValues.brand);
  const [category, setCategory] = useState(initialValues.category);
  const [description, setDescription] = useState(initialValues.description);
  const [imgURL, setImgURL] = useState(initialValues.imgURL);
  const [imgFile, setImgFile] = useState(undefined);
  const [price, setPrice] = useState(initialValues.price);
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showGuardarModal, setShowGuardarModal] = useState(false);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [stock, setStock] = useState(initialValues.stock);
  const [tags, setTags] = useState(initialValues.tags);
  const [title, setTitle] = useState(initialValues.title);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const navigate = useNavigate();
  const uploadFileRef = useRef();

  //Validate onSubmit function
  if (!onSubmit || typeof onSubmit !== "function") return console.error("Se espera una funcion onSubmit");

  //Handle inputs

  const handleUploadImgButton = () => {
    uploadFileRef.current?.click();
  };

  const handleUpFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate the img type
    const validTypes = ["image/jpeg", "image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Solo se permiten imágenes JPG, , JPEG, PNG o WEBP.");
      return;
    }

    // Set imgFile
    setImgFile(file);

    //show image cropper
    setShowImageCropper(true);

    //reset input
    e.target.value = "";
  };

  const handleInputChange = (e) => {
    let field = e.target.name,
      value = e.target.value;
    const NUMREGEX = /^(0|[1-9]\d*)?$/;
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        if (NUMREGEX.test(value)) {
          setPrice(value);
        }
        break;
      case "stock":
        if (NUMREGEX.test(value)) {
          setStock(value);
        }
        break;
      case "tags":
        setTags(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSelect = (field, value) => {
    switch (field) {
      case "brand":
        setBrand(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Image crop functions
  const handleCropConfirm = (croppedImg) => {
    setImgURL(croppedImg.url);
    setImgFile(croppedImg.file);
    setShowImageCropper(false);
  };

  const handleCropCancel = () => {
    setShowImageCropper(false);
  };

  //Save Modal functions
  const handleGuardarButton = () => {
    if (!title.trim()) {
      scrollTo("title");
      setErrors((prev) => ({ ...prev, title: "Se debe de poner un nombre" }));
      return;
    }
    if (!price.trim() || price == 0) {
      scrollTo("price");
      setErrors((prev) => ({ ...prev, price: "Se debe de poner un precio válido" }));
      return;
    }
    if (!stock.trim() || stock == 0) {
      scrollTo("stock");
      setErrors((prev) => ({ ...prev, stock: "Se debe de poner un stock válido" }));
      return;
    }
    if (!brand) {
      scrollTo("brand");
      setErrors((prev) => ({ ...prev, brand: "Se debe de seleccionar una marca" }));
      return;
    }
    if (!category) {
      scrollTo("category");
      setErrors((prev) => ({ ...prev, category: "Se debe de seleccionar una categoría" }));
      return;
    }
    if (!tags.trim()) {
      scrollTo("tags");
      setErrors((prev) => ({ ...prev, tags: "Se debe de poner al menos un tag" }));
      return;
    }
    setShowGuardarModal(true);
  };

  const closeGuardarModal = () => {
    setShowGuardarModal(false);
  };

  const onConfirmGuardarModal = async () => {
    //    Detect if the showSelectStatus is true
    const formObject = {
      imgURL,
      title,
      description,
      price,
      stock,
      brand,
      category,
      tags,
    };
    await onSubmit(formObject);
  };

  // Cancel Modal Functions
  const openCancelarModal = () => {
    setShowCancelarModal(true);
  };

  const closeCancelarModal = () => {
    setShowCancelarModal(false);
  };

  const onConfirmCancelarModal = async () => {
    navigate("/");
  };

  return (
    <>
      <section className={`${styles.formContainer} mt-3`}>
        <div className={`${styles.infoContainer}`}>
          {/* Image */}
          <div className={styles.imgWrapper}>
            <div className={styles.imgContainer}>
              {!imgURL ? "" : <img src={imgURL} alt="Imagen del producto" />}
              <div className={styles.uploadImgContainer}>
                <input ref={uploadFileRef} onChange={(e) => handleUpFileChange(e)} id="fileUpload" name="fileUpload" type="file" accept=".jpg, .jpeg, .png, .webp" />
                <Button mode="primary" onClick={handleUploadImgButton}>
                  Subir imagen
                </Button>
              </div>
            </div>
          </div>
          {/* Product basic info */}
          <section className={`${styles.inputsSection}`}>
            <h2>Información del producto</h2>
            <div className={`${styles.inputContainer}`} id="title">
              <p>Nombre del producto</p>
              <FormInput placeholder="Nombre del producto" name="title" value={title} onChange={handleInputChange} />
              {errors.title && <ErrorTooltip error={errors.title} />}
            </div>

            <div className={`${styles.descriptionContainer} ${styles.inputContainer}`} id="description">
              <p>Descripción del producto</p>
              <textarea placeholder="Descripción" name="description" value={description} onChange={handleInputChange} />
            </div>
          </section>

          {/* Price and stock */}
          <section className={`${styles.inputsSection}`}>
            <h2>Precio y stock</h2>
            <div className={`${styles.inputContainer}`} id="price">
              <p>Precio</p>
              <FormInput type="number" placeholder="Precio del producto" name="price" value={price} onChange={handleInputChange} />
              {errors.price && <ErrorTooltip error={errors.price} />}
            </div>

            <div className={`${styles.inputContainer}`} id="stock">
              <p>Stock</p>
              <FormInput type="number" placeholder="Stock del producto" name="stock" value={stock} onChange={handleInputChange} />
              {errors.stock && <ErrorTooltip error={errors.stock} />}
            </div>
          </section>

          {/* Organization */}
          <section className={`${styles.inputsSection}`}>
            <h2>Organización</h2>
            <div className={`${styles.inputContainer}`} id="brand">
              <p>Marca</p>
              <CustomSelect options={["opcion 1"]} addItemText="Agregar nueva marca" onOptionSelect={(value) => handleSelect("brand", value)} />
              {errors.brand && <ErrorTooltip error={errors.brand} />}
            </div>

            <div className={`${styles.inputContainer}`} id="category">
              <p>Categoría</p>
              <CustomSelect addItemText="Agregar nueva categoría" options={["opcion 1"]} onOptionSelect={(value) => handleSelect("category", value)} />
              {errors.category && <ErrorTooltip error={errors.category} />}
            </div>

            <div className={`${styles.inputContainer}`} id="tags">
              <p>Tags</p>
              <FormInput placeholder="Agrega los tags separados por coma (,)" name="tags" value={tags} onChange={handleInputChange} />
              {errors.tags && <ErrorTooltip error={errors.tags} />}
            </div>
          </section>
        </div>

        {/* Action buttons */}
        <div className={styles.actionButtonsWrapper}>
          <div className={`${styles.actionButtonsContainer} d-flex flex-sm-row`}>
            <Button mode="primary" children="Guardar" fullWidth="true" onClick={handleGuardarButton} />
            <Button mode="default" children="Cancelar" fullWidth="true" onClick={openCancelarModal} />
          </div>
        </div>
      </section>

      {/* Modals      */}
      {/* Crop image */}

      {showImageCropper ? <ImageCropper imgFile={imgFile} aspect={1} onCropConfirm={handleCropConfirm} onCropCancel={handleCropConfirm} /> : ""}
      {/* 
      <Modal title="¿Confirmar datos?" show={showGuardarModal} onConfirm={onConfirmGuardarModal} onCancel={closeGuardarModal} onClose={closeGuardarModal} />

      <Modal title="¿Seguro que desea cancelar?" show={showCancelarModal} onConfirm={onConfirmCancelarModal} onCancel={closeCancelarModal} onClose={closeCancelarModal} /> */}
    </>
  );
};
