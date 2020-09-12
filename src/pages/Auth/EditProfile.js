import React, {useContext, useState} from 'react'
import UserContext from "../../contexts/UserContext"
import useForm from '../../hooks/useForm';
import {checking, logIn} from "../../firebase/firebase"
import { toast } from '../../helpers/toast';
import { IonPage, IonLoading, IonContent, IonItem, IonLabel, IonInput, IonCol, IonButton, IonRow } from '@ionic/react';
import NavHeader from '../../components/Header/NavHeader';
import validateEditProfile from "../../validators/validateEditProfile"

const EditProfile = (props) => {
 
    const {user, setUser}= useContext(UserContext)
    const INITIAL_STATE = {
        name: user && user.displayName,
        email: user && user.email,
        newPassword: "",
        currentPassword: ""
    };

    const reauthenticate = async (email,password)=>{
    //   const credential = auth.EmailAuthProvider.credential(
    //     email,
    //     password
    //   );
    const credential = checking(email, password);
      try{
        await user.reauthenticateWithCredential(credential);
        console.log("Reauthenticate Successful")
      }catch(err){
        console.error("Profile Update Error", err);
        toast(err.message);
      }
    }


    const updateProfileItems = async (name, email, password) => {
      await user.updateProfile({
          displayName: name
      })
      await user.updateEmail(email);
      if(password){
          await user.updatePassword(password);
      }
    }

    const authenticateUser = async ()=>{
        setBusy(true);
        const {name, email, currentPassword, newPassword} = values;
        try{
          await reauthenticate(user.email, currentPassword);
          await updateProfileItems(name, email, newPassword);
          const result = await logIn(email, newPassword || currentPassword);
          // to update new values
          setValues({
            name: user && user.displayName,
            email: user && user.email,
            newPassword: "",
            currentPassword: "",
          });
          setUser(result.user);
          toast("Profile updated successfully");
          props.history.push("/profile");
        }catch(err){
          console.error("Profile Update Error", err);
          toast(err.message);
        }
        setBusy(false);
    }

    const {
        handleSubmit,
        handleChange,
        values,
        setValues,
        isSubmitting
    } = useForm(INITIAL_STATE, validateEditProfile, authenticateUser);

    const [busy, setBusy] = useState(false);

    return (
        <IonPage>
            <NavHeader title="Edit Profile"/> 
              <IonLoading message={"Please wait..."} isOpen={busy}/>
                 <IonContent color="secondary">
                     <IonItem lines="full" color="medium">
                      <IonLabel position="floating" color="dark">Username</IonLabel>
                      <IonInput 
                      name="name"
                      type="text"
                      value={values.name}
                      onIonChange = {handleChange}
                      required
                      ></IonInput>
                     </IonItem>

                     <IonItem lines="full" color="medium">
                      <IonLabel position="floating" color="dark">Email</IonLabel>
                      <IonInput 
                      name="email"
                      type="email"
                      value={values.email}
                      onIonChange = {handleChange}
                      required
                      ></IonInput>
                     </IonItem>

                     <IonItem lines="full" color="medium">
                      <IonLabel position="floating" color="dark">New Password</IonLabel>
                      <IonInput 
                      name="newPassword"
                      type="password"
                      value={values.newPassword}
                      onIonChange = {handleChange}
                      required
                      ></IonInput>
                     </IonItem>

                     <IonItem lines="full" color="medium">
                      <IonLabel position="floating" color="dark">Current Password</IonLabel>
                      <IonInput 
                      name="currentPassword"
                      type="password"
                      value={values.currentPassword}
                      onIonChange = {handleChange}
                      required
                      ></IonInput>
                     </IonItem>
                 
                   <IonRow>
                       <IonCol>
                           <IonButton
                           type="submit"
                           color="primary"
                           expand="block"
                           onClick={handleSubmit}
                           disabled={isSubmitting}
                           >
                            Save
                           </IonButton>
                       </IonCol>
                   </IonRow>
                 </IonContent> 
             </IonPage>
    )
}

export default EditProfile
