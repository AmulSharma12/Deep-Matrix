import React, { useState } from "react";
import styles from "./Phone.module.css";
import Card from "../../../../components/Shared/Card/Card";
import Button from "../../../../components/Shared/Button/Button";
import TextInput from "../../../../components/Shared/TextInput/TextInput";
import { sendOtp } from "../../../../http/index";
import { setOtp } from "../../../../store/authSlice";
import { useDispatch } from "react-redux";

// Phone component
const Phone = ({ onNext }) => {
  // Phone have local state
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  //------------ submit() for the server request
  async function submit() {
    //sever request
    console.log(phoneNumber);

    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <Card title="Enter your Phone number " icon="phone">
      {/* All the content passed inside the component will go as props and recieved in Card special props children */}
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text="Next" />
        </div>
        <p className={styles.termsAndService}>
          By entering your number, you're agreeing to our Terms and Service and
          Privacy Policy. Thanks !
        </p>
      </div>
    </Card>
  );
};

// exporting the Phone component
export default Phone;
