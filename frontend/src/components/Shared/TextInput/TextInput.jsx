import React from "react";
import styles from "./TextInput.module.css";

// creating TextInput component
const TextInput = ({ onChange }) => {
  return (
    <div>
      <input className={styles.input} type="text" onChange={onChange} />
    </div>
  );
};

// exporting TextInput component
export default TextInput;
