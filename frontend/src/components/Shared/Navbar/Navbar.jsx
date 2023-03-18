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
  const {isAuth} = useSelector(state=> state.auth);
  

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img className="logoStyle" src="/images/logo.png" alt="logo"></img>
        <span style={logoText}>Deep Matrix</span>
      </Link>

      {/* Logout button */}
      {isAuth && (
        <button className={styles.button} onClick={logoutUser}>
          Logout
        </button>
      )}
    </nav>
  );
};

// exporting Navbar module
export default Navbar;
