import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../../components/Shared/Card/Card";
import Button from "../../components/Shared/Button/Button";
// Home component
const Home = () => {
  //useHistory/useNavigate for redirecting page to another page
  const navigate = useNavigate();

  //function for startRegister
  function startRegister() {
    navigate("/authenticate");
    console.log("button clicked");
  }

  //returning Home component
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Room!" icon="logo">
        {/* All the content passed inside the component will go as props and recieved in Card special props children */}

        <p className={styles.text}>
          We Working hard to provide the Deep Matrix room ready. We are
          continously working to provide better product.
        </p>

        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>
      </Card>
    </div>
  );
};

export default Home;
