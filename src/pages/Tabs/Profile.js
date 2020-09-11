import React, {useContext} from 'react'
import {IonPage,  IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonRow, IonButton, IonGrid, IonCol, IonList, IonIcon} from '@ionic/react'
import SmallHeader from '../../components/Header/SmallHeader';
import LargeHeader from '../../components/Header/LargeHeader';
import {toast} from "../../helpers/toast";
import {logOut} from "../../firebase/firebase";
import UserContext from "../../contexts/UserContext"
import { personCircleOutline, mailOutline }from "ionicons/icons";
 
const Profile = (props) => {

    const {user} =useContext(UserContext);

    const logoutUser = async () =>{
      try{
        await logOut();
        props.history.push("/");
        toast("You have logged out successfully");
      }catch(err){
        console.error("Logout Error", err);
        toast(err.message);
      }
    }

    return (
        <IonPage>
           <SmallHeader title="Profile"/>
           <IonContent color="secondary" fullscreen>
               <LargeHeader title="Profile"/>
               {user? (
                   <>
                       <IonCard>
                           <IonCardContent >
                               <IonList lines="none">
                                   <IonItem>
                                       <IonIcon icon={personCircleOutline} color="dark" slot="start"></IonIcon>
                                           <IonLabel color="dark">
                                               <strong>{user.displayName}</strong>
                                               <p>Username</p>
                                           </IonLabel>
                                   </IonItem>
                                   <IonItem>
                                       <IonIcon icon={mailOutline} color="dark" slot="start"></IonIcon>
                                           <IonLabel color="dark">
                                               <strong>{user.email}</strong>
                                               <p>Email</p>
                                           </IonLabel>
                                   </IonItem>
                               </IonList>
                           </IonCardContent>
                       </IonCard>

                       <IonRow>
                           <IonCol>
                               <IonButton expand="block" routerLink={'/edit-profile'} color="primary" fill="outline">
                                 Edit Profile
                               </IonButton>
                           </IonCol>
                       </IonRow>
                       <IonRow>
                           <IonCol>
                               <IonButton expand="block" onClick={logoutUser}>
                                 Log Out
                               </IonButton>
                           </IonCol>
                       </IonRow>
                   </>
               ): (
                   <IonGrid>
                     <IonRow>
                         <IonCol>
                             <IonButton expand="block" routerLink={'/register'} color="primary">
                                 Sign Up
                             </IonButton>
                         </IonCol>
                     </IonRow>
                     <IonRow>
                         <IonCol>
                             <IonButton expand="block" routerLink={'/login'} color="primary" fill="outline">
                                 Log In
                             </IonButton>
                         </IonCol>
                     </IonRow>
                   </IonGrid>
               )}
           </IonContent>
        </IonPage>
    )
}

export default Profile