import React from "react";
import styles from "./RoomCard.module.css";
import { useNavigate } from "react-router-dom";

//RoomCard component
const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Card component */}
      <div
        onClick={() => {
          navigate(`/room/${room.id}`);
        }}
        className={styles.card}
      >
        {/* topic -Card */}
        <h3 className={styles.topic}>{room.topic}</h3>

        {/* speakers container */}
        <div
          className={`${styles.speakers} ${
            room.speakers.length === 1 ? styles.singleSpeaker : ""
          }`}
        >
          {/* rendering avatars presentt in speakers array by looping it */}
          <div className={styles.avatars}>
            {room.speakers.map((speaker) => (
              <img
                key={speaker.id}
                src={speaker.avatar}
                alt="speaker-avatar"
              ></img>
            ))}
          </div>
          {/* rendering names presentt in speakers array by looping it */}
          <div className={styles.names}>
            {room.speakers.map((speaker) => (
              <div key={speaker.id} className={styles.nameWrapper}>
                <span>{speaker.name}</span>
                <img src="/images/chat-bubble.png" alt="img"></img>
              </div>
              // <img src={speaker.avatar} alt="speaker-avatar"></img>
            ))}
          </div>
        </div>

        {/* Total participants */}
        <div className={styles.peopleCount}>
          <span>{room.totalPeople}</span>
          <img src="/images/user-icon.png" alt="total-count"></img>
        </div>
      </div>
    </>
  );
};

//exporting RoomCard component
export default RoomCard;
