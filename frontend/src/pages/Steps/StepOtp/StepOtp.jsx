import React, { useState } from "react";
import styles from "./StepOtp.module.css";
import Card from "../../../components/Shared/Card/Card";
import Button from "../../../components/Shared/Button/Button";
import TextInput from "../../../components/Shared/TextInput/TextInput";
import { verifyOtp } from "../../../http/index";
import { useDispatch, useSelector } from "react-redux"; //for getting the value from the store
import { setAuth } from "../../../store/authSlice";

// StepOtp component
const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.auth.otp);
  //submit function will make request to the server whether otp is correct or not
  async function submit() {
    //if field not filled then return dont make any request
    if (!otp || !phone || !hash) return;
    //server request
    try {
      //making request to server for verify-otp
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data);
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  //returning the StepOtp component
  return (
    <>
      <div className={styles.cardWrap}>
        <Card title="Enter the code we just texted you" icon="lock">
          {/* All the content passed inside the component will go as props and recieved in Card special props children */}
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text="Next" />
            </div>
            <p className={styles.termsAndService}>
              By entering your number, you're agreeing to our Terms and Service
              and Privacy Policy. Thanks !
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

// exporting StepOtp component
export default StepOtp;
