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

  const [form, setForm] = useState({
    brand: initialValues.brand,
    category: initialValues.category,
    description: initialValues.description,
    imgFile: undefined,
    price: initialValues.price,
    stock: initialValues.stock,
    tags: initialValues.tags,
    title: initialValues.title,
  });

  const [imgURL, setImgURL] = useState(undefined);
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showGuardarModal, setShowGuardarModal] = useState(false);
  const [showImageCropper, setShowImageCropper] = useState(false);
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
    setForm((prev) => ({ ...prev, imgFile: file }));

    //show image cropper
    setShowImageCropper(true);

    //reset input
    e.target.value = "";
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "price" || name == "stock") {
      const NUMREGEX = /^(0|[1-9]\d*)?$/;
      if (NUMREGEX.test(value)) setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Image crop functions
  const handleCropConfirm = (croppedImg) => {
    setImgURL(croppedImg.url);
    setForm((prev) => ({ ...prev, imgFile: croppedImg }));
    setShowImageCropper(false);
  };

  const handleCropCancel = () => {
    setShowImageCropper(false);
  };

  //Save Modal functions
  const handleGuardarButton = () => {
    if (!form.title.trim()) {
      scrollTo("title");
      setErrors((prev) => ({ ...prev, title: "Se debe de poner un nombre" }));
      return;
    }
    if (!form.price.trim() || form.price == 0) {
      scrollTo("price");
      setErrors((prev) => ({ ...prev, price: "Se debe de poner un precio válido" }));
      return;
    }
    if (!form.stock.trim() || form.stock == 0) {
      scrollTo("stock");
      setErrors((prev) => ({ ...prev, stock: "Se debe de poner un stock válido" }));
      return;
    }
    if (!form.brand) {
      scrollTo("brand");
      setErrors((prev) => ({ ...prev, brand: "Se debe de seleccionar una marca" }));
      return;
    }
    if (!form.category) {
      scrollTo("category");
      setErrors((prev) => ({ ...prev, category: "Se debe de seleccionar una categoría" }));
      return;
    }
    if (!form.tags.trim()) {
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
    await onSubmit(form);
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
              <FormInput placeholder="Nombre del producto" name="title" value={form.title} onChange={onInputChange} />
              {errors.title && <ErrorTooltip error={errors.title} />}
            </div>

            <div className={`${styles.descriptionContainer} ${styles.inputContainer}`} id="description">
              <p>Descripción del producto</p>
              <textarea placeholder="Descripción" name="description" value={form.description} onChange={onInputChange} />
            </div>
          </section>

          {/* Price and stock */}
          <section className={`${styles.inputsSection}`}>
            <h2>Precio y stock</h2>
            <div className={`${styles.inputContainer}`} id="price">
              <p>Precio</p>
              <FormInput type="number" placeholder="Precio del producto" name="price" value={form.price} onChange={onInputChange} />
              {errors.price && <ErrorTooltip error={errors.price} />}
            </div>

            <div className={`${styles.inputContainer}`} id="stock">
              <p>Stock</p>
              <FormInput type="number" placeholder="Stock del producto" name="stock" value={form.stock} onChange={onInputChange} />
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
              <FormInput placeholder="Agrega los tags separados por coma (,)" name="tags" value={form.tags} onChange={onInputChange} />
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

      {showImageCropper ? <ImageCropper imgFile={form.imgFile} aspect={1} onCropConfirm={handleCropConfirm} onCropCancel={handleCropConfirm} /> : ""}
      {/* 
      <Modal title="¿Confirmar datos?" show={showGuardarModal} onConfirm={onConfirmGuardarModal} onCancel={closeGuardarModal} onClose={closeGuardarModal} />

      <Modal title="¿Seguro que desea cancelar?" show={showCancelarModal} onConfirm={onConfirmCancelarModal} onCancel={closeCancelarModal} onClose={closeCancelarModal} /> */}
    </>
  );
};
