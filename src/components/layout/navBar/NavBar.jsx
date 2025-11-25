import styles from "./NavBar.module.css";
import StoreLogo from "@/assets/svg/store.svg?react";
import CategoriesLogo from "@/assets/svg/sell.svg?react";
import ReceiptLogo from "@/assets/svg/receipt.svg?react";
import AnalyticsLogo from "@/assets/svg/analytics.svg?react";
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
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.CATEGORIES} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <CategoriesLogo className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.PURCHASES} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <ReceiptLogo className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ANALYTICS} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <AnalyticsLogo className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ACCOUNT} className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : `${styles.navLink}`)}>
            <PersonLogo className="icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
