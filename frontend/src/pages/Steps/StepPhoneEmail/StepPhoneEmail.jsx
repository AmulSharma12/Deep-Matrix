import React, { useState } from "react";
import styles from "./StepPhoneEmail.module.css";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";

// Creating PhoneEmail map
const PhoneEmailMap = {
  phone: Phone,
  email: Email,
};

// StepPhoneEmail component
const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = PhoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrap}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton} ${
                type === "phone" ? styles.active : ""
              }`}
              onClick={() => setType("phone")}
            >
              <img src="/images/call.png" alt="call" />
            </button>
            <button
              className={`${styles.tabButton} ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => setType("email")}
            >
              <img src="/images/email.png" alt="email" />
            </button>
          </div>

          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

// exporting StepPhoneEmail component
export default StepPhoneEmail;
