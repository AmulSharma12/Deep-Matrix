import React from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../Shared/TextInput/TextInput";

const AddRoomModal = ({onClose}) => {
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        {/* close button  X*/}
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="closeButton" />
        </button>
        {/* modalHeader */}
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput classNam={styles.textInput} fullWidth="true" />

          {/* room types */}
          <h2 className={styles.subHeading}> Room Types</h2>
          <div className={styles.roomTypes}>
            <div className={styles.typeBox}>
              <img src="/images/globe.png"></img>
              <span>Open</span>
            </div>
            <div className={styles.typeBox}>
              <img src="/images/social.png"></img>
              <span>Social</span>
            </div>
            <div className={styles.typeBox}>
              <img src="/images/lock.png"></img>
              <span>Private</span>
            </div>
          </div>
        </div>

        {/* modalFooter */}
        <div className={styles.modalFooter}>
          <h2>Start a room, Open to everyone</h2>
          <button className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration"></img>
            <span>Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
