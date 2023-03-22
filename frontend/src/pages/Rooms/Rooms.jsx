import React from "react";
import RoomCard from "../../components/Shared/RoomCard/RoomCard";
import styles from "./Rooms.module.css";

//dummy data for the room list
const rooms = [
  {
    id: 1,
    topic: "Which framework best for frontend ?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/profile.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/profile.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "What’s new in machine learning?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/profile.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/profile.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: "Why people use stack overflow?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/profile.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/profile.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/profile.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/profile.png",
      },
    ],
    totalPeople: 40,
  },
];

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
              <img
                className={styles.roomImage}
                src="/images/room-icon.png"
              ></img>
              <span>Start a room!</span>
            </button>
          </div>
        </div>

        {/* room body elements */}
        <div className={styles.roomList}>
          {/* rendering the rooms list */}
          {rooms.map((room) => (
            <>
              <RoomCard key={room.id} room={room} />
              <RoomCard key={room.id} room={room} />
              <RoomCard key={room.id} room={room} />
              <RoomCard key={room.id} room={room} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

// exporting rooms component
export default Rooms;
