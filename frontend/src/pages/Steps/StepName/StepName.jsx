import React, { useState } from "react";
import styles from "./StepName.module.css";
import Card from "../../../components/Shared/Card/Card";
import Button from "../../../components/Shared/Button/Button";
import TextInput from "../../../components/Shared/TextInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

// StepName component
const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  //-----------submit() function
  function nextStep() {
    if (!fullname) {
      return;
    }

    //dispatching fullname to store
    dispatch(setName(fullname));
    onNext(); //go to next page
  }
  return (
    <>
      <div className={styles.cardWrap}>
        <Card title="Enter your username" icon="profile">
          {/* All the content passed inside the component will go as props and recieved in Card special props children */}
          <TextInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <p className={styles.termsAndService}>
            You can provide full name or username whatever suits you !
          </p>

          <div className={styles.actionButtonWrap}>
            <Button onClick={nextStep} text="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

// exporting the StepName module
export default StepName;
