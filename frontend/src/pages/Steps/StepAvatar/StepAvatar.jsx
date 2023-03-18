import React, { useState } from "react";
import styles from "./StepAvatar.module.css";
import Card from "../../../components/Shared/Card/Card";
import Button from "../../../components/Shared/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";

// StepAvatar module
const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activate);
  const [profile, setProfile] = useState("/images/default.jpg");
  const dispatch = useDispatch();

  //captureImage function
  function captureImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    //once file read finished setProfile
    reader.onloadend = function () {
      // console.log(reader.result);
      setProfile(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  //submit() - making request to the server
  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        //updating in the store
        dispatch(setAuth(data));
      }
      console.log(data);
    } catch (err) {
      console.log("Error " + err);
    }
  }
  return (
    <>
      <div className={styles.cardWrap}>
        <Card title={`Hi, ${name}!`} icon="profile">
          <p className={styles.subheading}>Setup profile picture</p>
          <div className={styles.avatarWrapper}>
            <img className={styles.image} src={profile} alt="err"></img>
          </div>

          {/* Choose another photo */}
          <input
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
            onChange={captureImage}
          />
          <label className={styles.avatarInputText} htmlFor="avatarInput">
            Choose a different photo
          </label>

          {/* submit button functionalities */}
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

// exporting the StepAvatar module
export default StepAvatar;
