import React, { useState } from "react";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import { useNavigate } from "react-router-dom";

// steps going through
const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

// creating Authenticate component
const Authenticate = () => {
  // Inside Authenticate component - local state for managing states
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <>
      <Step onNext={onNext} />
    </>
  );
};

// exporting Authenticate component
export default Authenticate;
