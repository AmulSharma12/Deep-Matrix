import React from "react";
import styles from "./TextInput.module.css";

// creating TextInput component
const TextInput = ({ onChange, fullWidth }) => {
  return (
    <div>
      <input
        className={styles.input}
        style={{ width: fullWidth ? "100%" : "inherit" }}
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

// exporting TextInput component
export default TextInput;
