import React from "react";
import styles from "./Button.module.css";

// Button module
const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.text}>{text}</span>
      <img className={styles.arrow} src="/images/arrow.png" alt="arrow"></img>
    </button>
  );
};

// exporting Button module
export default Button;
