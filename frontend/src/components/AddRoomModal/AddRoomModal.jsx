import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../Shared/TextInput/TextInput";
import { createRoom as create } from "../../http/index";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  // createRoom function will create the room
  async function createRoom() {
    //server call for creating the room
    try {
      if (!topic) return;

      // server request for creating room
      const { data } = await create({ topic, roomType });
      // console.log("from client ", data);

      //redirecting to single room
      navigate(`/room/${data.id}`);
      // console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }

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
          <TextInput
            classNam={styles.textInput}
            fullWidth="true"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />

          {/* room types */}
          <h2 className={styles.subHeading}> Room Types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/globe.png"></img>
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png"></img>
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/lock.png"></img>
              <span>Private</span>
            </div>
          </div>
        </div>

        {/* modalFooter */}
        <div className={styles.modalFooter}>
          <h2>Start a room, Open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration"></img>
            <span>Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
