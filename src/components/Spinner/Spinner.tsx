import React from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner = ({ size = "md", className = "" }: SpinnerProps) => {
  const sizeClass = styles[`spinner-${size}`];
  const spinnerClasses = `${styles.spinner} ${sizeClass} ${className}`;

  return (
    <div role="status" className={spinnerClasses}>
      <span className={styles.visuallyHidden}>Loading...</span>
    </div>
  );
};
