import React, {useState} from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import validatePasswordReset from "../../validators/validatePasswordReset";
import useForm from '../../hooks/useForm';
import {resetPassword} from '../../firebase/firebase'
import  {toast} from "../../helpers/toast";

const INITIAL_STATE = {
  email: ""
}

const Forgot = () => {

  const [busy, setBusy] = useState(false);

const handlePasswordReset = async () =>{
  setBusy(true);
  const {email} = values;

  try{
    await resetPassword(email);
    toast("Check your email to reset your password");
  }catch(err){
    console.error("Password Reset Error", err)
    toast(err.message);
  }
  setBusy(false);
}

  const {handleSubmit, handleChange, values,  isSubmitting, } = useForm(INITIAL_STATE, validatePasswordReset, handlePasswordReset)

  return (
    <IonPage>
      <NavHeader title="Password Reset" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel color="secondary" position="floating">Email</IonLabel>
          <IonInput value={values.email} onIonChange={handleChange} name="email" type="text" required></IonInput>
        </IonItem>
       
        <IonRow>
          <IonCol>
            <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disabled={isSubmitting}>
              Get Reset Link
            </IonButton>
          </IonCol>
        </IonRow>

     
      </IonContent>
    </IonPage>
  );
};

export default Forgot;
