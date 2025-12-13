import styles from "./NavBar.module.css";
import StoreLogo from "@/assets/svg/store.svg?react";
import CategoriesLogo from "@/assets/svg/sell.svg?react";
import ReceiptLogo from "@/assets/svg/receipt.svg?react";
import AddIcon from "@/assets/svg/add.svg?react";
import PersonLogo from "@/assets/svg/person.svg?react";
import { ROUTES } from "@/constants/routes.js";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className={`${styles.nav} position-md-relative`}>
      <ul>
        <li>
          <NavLink to={ROUTES.HOME} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <StoreLogo className="icon" />
            <small>Inicio</small>
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.CATEGORIES} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <CategoriesLogo className="icon" />
            <small>Categorias</small>
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ADD_PRODUCT} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink} ${styles.addIcon} `)}>
            <AddIcon className="icon" />
            <small>Agregar</small>
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.PURCHASES} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <ReceiptLogo className="icon" />
            <small>Facturas</small>
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ACCOUNT} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <PersonLogo className="icon" />
            <small>Cuenta</small>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
