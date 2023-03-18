import React,{useState}  from "react";
import styles from './Email.module.css';
import Card from "../../../../components/Shared/Card/Card";
import Button from "../../../../components/Shared/Button/Button";
import TextInput from "../../../../components/Shared/TextInput/TextInput";

// Email component
const Email = ({onNext}) => {
  const [email, setEmail] = useState('');

  return (
    <Card title="Enter your Email id " icon="email">
      {/* All the content passed inside the component will go as props and recieved in Card special props children */}
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)}/>
      <div>
        <div className={styles.actionButtonWrap}>
        <Button onClick={onNext} text="Next" />
        </div>
        <p className={styles.termsAndService}>
          By entering your number, you're agreeing to our Terms and Service and Privacy Policy. Thanks !
        </p>
      </div>
    </Card>
  );
};

// exporting Email component
export default Email;
