import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.brand}>
          Simple Transfer
        </NavLink>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/" className={getNavLinkClass} end>
              Create Account
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/balance" className={getNavLinkClass}>
              View Balance
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/transfer" className={getNavLinkClass}>
              Send Money
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
