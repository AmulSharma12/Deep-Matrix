import React from "react";
import styles from "./Card.module.css";

// children is a special prop which will scrap the content inside the component as a prop
const Card = ({ title, icon, children }) => {
  return (
    <div className={styles.card}>
      {/* headingWrapper */}
      <div className={styles.headingWrapper}>
        {/* Shortcircuit or conditional rendering  for image and title */}
        {icon && (
          <img
            className={styles.logoStyle}
            src={`/images/${icon}.png`}
            alt="logo"
          ></img>
        )}
        {title && <h1 className={styles.heading}>{title}</h1>}
      </div>
      {children}
    </div>
  );
};
// exporting Card component
export default Card;
