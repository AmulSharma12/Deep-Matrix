import React from "react";
import styles from "./Rooms.module.css";

// creating Rooms component
const Rooms = () => {
  return (
    <>
      {/* container for room */}
      <div className={styles.roomsContainer}>
        {/* room header */}
        <div className={styles.roomsHeader}>
          {/* left items */}
          <div className={styles.left}>
            <span className={styles.spanText}>All Voice rooms </span>
            {/* wrapper for input field -left */}
            <div className={styles.inputWrapper}>
              <img
                className={styles.searchImage}
                src="/images/search.png"
              ></img>
              <input className={styles.inputSearchField} type="text"></input>
            </div>
          </div>
          {/* right items */}
          <div className={styles.right}>
            <button className={styles.startRoomButton}>
              <img className={styles.roomImage} src="/images/room-icon.png"></img>
              <span>Start a room!</span>
            </button>
          </div>
        </div>

        {/* room body elements */}
      </div>
    </>
  );
};

// exporting rooms component
export default Rooms;
