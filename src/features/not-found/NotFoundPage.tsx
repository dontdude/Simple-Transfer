import { Link } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className="container">
      <Card className={styles.container}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className={styles.homeLink}>
          Go to Homepage
        </Link>
      </Card>
    </div>
  );
};
