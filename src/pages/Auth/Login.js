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
  IonRouterLink,
  IonLoading
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import useForm from '../../hooks/useForm';
import {logIn} from '../../firebase/firebase'
import  {toast} from "../../helpers/toast";
import validateLogin from '../../validators/validateLogin'

const INITIAL_STATE= {
  email: "",
  password: ""
}

const Login = (props) => {


const [busy, setBusy] = useState(false);

const authenticateUser =async ()=>{
   setBusy(true);
   const {email, password} = values;
   try{
    await logIn(email, password);
    toast("You have logged in successfully");
    props.history.push("/");
   }catch(err){
     console.error("Authentication Error", err);
     toast(err.message);
   }
   setBusy(false);
}

const {handleSubmit, handleChange, values,  isSubmitting, } = useForm(INITIAL_STATE, validateLogin, authenticateUser)

  return (
    <IonPage c>
      <NavHeader title="Log In" />
        <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent color="secondary">
        <IonItem lines="full" color="secondary">
          <IonLabel color="tertiary" position="floating">Email</IonLabel>
          <IonInput value={values.email} onIonChange={handleChange} name="email" type="text" required></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel color="tertiary" position="floating">Password</IonLabel>
          <IonInput value={values.password} onIonChange={handleChange} name="password" type="password" required></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} disabled={isSubmitting}>
              Log In
            </IonButton>
          </IonCol>
        </IonRow>

     <IonRow>
        <IonCol class="ion-text-center ion-padding-vertical">
             <IonRouterLink routerLink={"/forgot"}>
                Forgot Password?
             </IonRouterLink>
        </IonCol>
      </IonRow>    
      </IonContent>
    </IonPage>
  );
};

export default Login;
