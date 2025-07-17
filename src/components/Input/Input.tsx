import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string; // For custom wrapper styling
  error?: boolean; // To toggle error styles
}

export const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  className = "",
  error = false,
}: InputProps) => {
  const wrapperClasses = `${styles.inputWrapper} ${className}`;
  // global .input-error class if there's an error
  const inputClasses = `${styles.inputField} ${error ? "input-error" : ""}`;

  return (
    <div className={wrapperClasses}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
      />
    </div>
  );
};
