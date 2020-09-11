import React, {useState} from 'react'
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton, IonLoading } from '@ionic/react'
import NavHeader from '../../components/Header/NavHeader'
import {toast} from "../../helpers/toast";
import useForm from '../../hooks/useForm';
import {register} from '../../firebase/firebase'
import validateSignUp from '../../validators/validateSignup'

const INITIAL_STATE= {
    name: "",
    email: "",
    password: ""
}

const SignUp = (props) => {

    const [busy, setBusy] = useState(false);

    const authenticateUser = async ()=>{
     setBusy(true);
      const {name, email, password} = values;
      try{
        await register(name, email, password);
        toast("You have signed up successfully!");
        props.history.push("/");
      }catch(err){
        console.error("Authentictaion error", err);
        toast(err.message);
      }
      setBusy(false);
    }

    const {handleSubmit, handleChange, values,  isSubmitting, } = useForm(INITIAL_STATE, validateSignUp, authenticateUser)
    

    return (
        <IonPage>
            <NavHeader title="Sign Up"/>
            <IonLoading message={"Please wait..."} isOpen={busy} />
            <IonContent color="secondary">
                <IonItem lines="full">
                   <IonLabel position="floating" color="tertiary">Username</IonLabel>
                   <IonInput
                   value= {values.name}
                   name="name"
                   type ="text"
                   onIonChange ={handleChange}
                   required
                   >
                   </IonInput>
                </IonItem>
                <IonItem lines="full">
                   <IonLabel position="floating" color="tertiary">Email</IonLabel>
                   <IonInput
                   value= {values.email}
                   name="email"
                   type ="email"
                   onIonChange ={handleChange}
                   required
                   >
                  </IonInput>
                </IonItem>  
                <IonItem lines="full">
                   <IonLabel position="floating">Password</IonLabel>
                   <IonInput
                   value= {values.password}
                   name="password"
                   type ="password"
                   onIonChange ={handleChange}
                   required
                   >
                   </IonInput>
                 </IonItem>

                <IonRow>
                    <IonCol>
                        <IonButton type="submit" color="primary" expand="block" onClick={handleSubmit} diabled={isSubmitting}>
                             Sign Up
                        </IonButton>
                    </IonCol>
                </IonRow>
               
            </IonContent>
        </IonPage>
    )
}

export default SignUp
