import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { logout } from "../../../http";

// Navbar component
const Navbar = () => {
  //brand style
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
  };

  //logo text style
  const logoText = {
    marginLeft: "10px",
  };

  //-----------logout() function
  const dispatch = useDispatch();
  async function logoutUser() {
    // logout logic
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log("logout error");
    }
  }

  // Accessing isAuth from useSelector and based on their value will be rendering
  // happens iAuth true then logout visible otherwise not
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img className="logoStyle" src="/images/logo.png" alt="logo"></img>
        <span style={logoText}>Deep Matrix</span>
      </Link>

      {/* profile image and logout button */}
      {user && user.name && user.avatar && (
        <div className={styles.navRight}>
          {/* profile name */}
          <h3>{user.name}</h3>

          {/* profile image */}
          <Link to="/">
            <img
              className={styles.profileImage}
              src={user.avatar}
              alt="avatar"
            />
          </Link>

          {/* logout button */}
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" width="40px" height="30px"></img>
          </button>
        </div>
      )}
    </nav>
  );
};

// exporting Navbar module
export default Navbar;
