"use client";
import { useRef, useState } from "react";
import styles from "./ProductForm.module.css";
import { ErrorTooltip } from "../ui/errorTooltip/ErrorTooltip";
// import { Modal } from "../ui/modal/Modal";
// import { ImageCropper } from "@/components/imageCropper/ImageCropper";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button/Button";

const DEFAULT_VALUES = {
  title: "",
  imgURL: "",
  category: "",
  description: "",
  tags: "",
  price: 0,
  stock: 0,
  brand: "",
};

export const ProductForm = ({ initialValuesObject, onSubmit = () => console.log("hola") }) => {
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

  const onInputChange = (e) => {
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
      case "category":
        setCategory(value);
        break;
      case "tags":
        setTags(value);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Image crop functions
  const onCropConfirm = (croppedImg) => {
    setImgURL(croppedImg.url);
    setImgFile(croppedImg.file);
    setShowImageCropper(false);
  };

  const onCropCancel = () => {
    setShowImageCropper(false);
  };

  //Save Modal functions
  const handleGuardarButton = () => {
    if (!title.trim()) {
      navigate("#title");
      setErrors((prev) => ({ ...prev, title: "Se debe de poner un nombre" }));
      return;
    }
    if (!price.trim() || price == 0) {
      navigate("#price");
      setErrors((prev) => ({ ...prev, price: "Se debe de poner un precio válido" }));
      return;
    }
    if (!stock.trim() || stock == 0) {
      navigate("#stock");
      setErrors((prev) => ({ ...prev, price: "Se debe de poner un stock válido" }));
      return;
    }
    if (!category.trim()) {
      navigate("#category");
      setErrors((prev) => ({ ...prev, price: "Se debe de seleccionar una categoría" }));
      return;
    }
    if (!tags.trim()) {
      navigate("#tags");
      setErrors((prev) => ({ ...prev, price: "Se debe de poner al menos un tag" }));
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
      <section className={`${styles.formContainer} mt-2`}>
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
              <input type="text" placeholder="Nombre del producto" name="title" value={title} onChange={(e) => onInputChange(e)}></input>
              {errors.title && <ErrorTooltip error={errors.title} />}
            </div>

            <div className={`${styles.descriptionContainer} ${styles.inputContainer}`} id="description">
              <p>Descripción del producto</p>
              <textarea placeholder="Descripción" name="description" value={description} onChange={(e) => onInputChange(e)} />
            </div>
          </section>
          {/* Price and stock */}
          <section className={`${styles.inputsSection}`}>
            <h2>Precio y stock</h2>
            <div className={`${styles.inputContainer}`} id="price">
              <p>Precio</p>
              <input type="number" placeholder="Precio del producto" name="price" value={price} onChange={(e) => onInputChange(e)}></input>
              {errors.price && <ErrorTooltip error={errors.price} />}
            </div>

            <div className={`${styles.inputContainer}`} id="stock">
              <p>Stock</p>
              <input type="number" placeholder="Stock del producto" name="stock" value={stock} onChange={(e) => onInputChange(e)}></input>
              {errors.stock && <ErrorTooltip error={errors.stock} />}
            </div>
          </section>

          {/* Organization */}
          <section className={`${styles.inputsSection}`}>
            <h2>Organización</h2>
            <div className={`${styles.inputContainer}`} id="brand">
              <p>Marca</p>
              <select name="brand" value={brand} onChange={(e) => onInputChange(e)}>
                <option selected disabled value="">
                  - Seleccione una marca -
                </option>
              </select>
              {errors.brand && <ErrorTooltip error={errors.brand} />}
            </div>

            <div className={`${styles.inputContainer}`} id="category">
              <p>Categoría</p>
              <select name="category" value={category} onChange={(e) => onInputChange(e)}>
                <option selected disabled value="">
                  - Seleccione una categoría -
                </option>
              </select>
              {errors.category && <ErrorTooltip error={errors.category} />}
            </div>

            <div className={`${styles.inputContainer}`} id="tags">
              <p>Tags</p>
              <input type="text" placeholder="Agrega los tags separados por coma (,)" name="tags" value={tags} onChange={(e) => onInputChange(e)}></input>
              {errors.tags && <ErrorTooltip error={errors.tags} />}
            </div>
          </section>
        </div>

        {/* Action buttons */}
        <div className={styles.actionButtonsWrapper}>
          <div className={`${styles.actionButtonsContainer} d-flex flex-sm-row`}>
            <Button mode="primary" text="Guardar" fullWidth="true" onClick={handleGuardarButton} />
            <Button mode="default" text="Cancelar" fullWidth="true" onClick={openCancelarModal} />
          </div>
        </div>
      </section>

      {/*     Modals     
      Crop image
      {showImageCropper ? <ImageCropper imgFile={imgFile} aspect={4 / 3} onCropConfirm={onCropConfirm} onCropCancel={onCropCancel} /> : ""}

      <Modal title="¿Confirmar datos?" show={showGuardarModal} onConfirm={onConfirmGuardarModal} onCancel={closeGuardarModal} onClose={closeGuardarModal} />

      <Modal title="¿Seguro que desea cancelar?" show={showCancelarModal} onConfirm={onConfirmCancelarModal} onCancel={closeCancelarModal} onClose={closeCancelarModal} />
      */}
    </>
  );
};
