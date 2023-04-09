import React, { useEffect, useState } from "react";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";
import { getAllRooms } from "../../http";

//dummy data for the room list
// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

// creating Rooms component
const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  // useEffect() for the server request for fetching all the rooms
  // empty array means once the page loaded then the function get called
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      console.log(data);
      setRooms(data);
    };

    // once the page get loaded fetchRooms will be invoked
    fetchRooms();
  }, []);

  function openModal() {
    setShowModal(true);
    // console.log("show Modal opened");
  }
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
            <button onClick={openModal} className={styles.startRoomButton}>
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
            </>
          ))}
        </div>
      </div>

      {showModal && <AddRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

// exporting rooms component
export default Rooms;
