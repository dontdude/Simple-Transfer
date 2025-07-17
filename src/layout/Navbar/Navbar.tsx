import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.brand}>
          Simple Transfer
        </NavLink>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ""}`
              }
              end // Using 'end' to prevent matching on child routes
            >
              Create Account
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/balance"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              View Balance
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/transfer"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              Send Money
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
