import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

// steps going through
const steps = {
  1: StepName,
  2: StepAvatar,
};

// creating Actiavte component
const Activate = () => {
  // Inside Actiavte component - local state for managing states
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

// exporting Actiavte component
export default Activate;
