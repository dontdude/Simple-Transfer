import { NavLink } from "react-router-dom";
import { useAccountStore } from "../../store/account.store";
import LogoutIcon from "../../assets/icons/logout.svg";
import { showSuccess } from "../../hooks/useToast";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const accountId = useAccountStore((state) => state.accountId);
  const clearAccount = useAccountStore((state) => state.clearAccount);

  const handleLogout = () => {
    clearAccount();
    showSuccess("Logged out successfully");
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.brandContainer}>
          <NavLink to="/" className={styles.brand}>
            Simple Transfer
          </NavLink>
          {accountId && (
            <button
              onClick={handleLogout}
              className={styles.accountId}
              title={`Logout from account ${accountId}`}
            >
              ID: {accountId}
              <img src={LogoutIcon} alt="Logout" />
            </button>
          )}
        </div>
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
