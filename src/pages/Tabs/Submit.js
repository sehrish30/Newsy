import React, {useContext} from 'react'
import {IonPage,  IonContent, IonItem, IonLabel, IonInput, IonRow, IonCol, IonButton} from '@ionic/react'
import SmallHeader from '../../components/Header/SmallHeader';
import LargeHeader from '../../components/Header/LargeHeader';
import UserContext from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import {useHistory} from 'react-router-dom';
import {dbLinksRef} from "../../firebase/firebase";
import validateCreateLink from "../../validators/validateCreateLink"

const INITIAL_STATE = {
    description: "",
    url: ""
}



const Submit = (props) => {
    // let history = useHistory();
    const {user} = useContext(UserContext);

   const handleCreateLink = async ()=>{
     if(!user){
        // history.push("/login");   
      props.history.push('/login');
     }else{
       const {url, description} = values;
       const newLink = {
           url,
           description,
           postedBy: {
               id: user.uid,
               name: user.displayName
           },
           voteCount: 1,
           votes: [],
           comments: [],
           created: Date.now()
       };
       await dbLinksRef.add(newLink);
       props.history.push("/");
     }
   }

    const {handleSubmit, handleChange, values} = useForm(INITIAL_STATE, validateCreateLink, handleCreateLink);



    return (
        <IonPage>
           <SmallHeader title="Submit"/>
           <IonContent color="secondary" fullscreen>
               <LargeHeader title="Submit"/>
               <IonItem lines="full">
                  <IonLabel position="floating">Description</IonLabel>
                  <IonInput
                  name="description"
                  value={values.description}
                  type="text"
                  onIonChange={handleChange}
                  required
                  />
               </IonItem>
               <IonItem lines="full">
                  <IonLabel position="floating">URL</IonLabel>
                  <IonInput
                  name="url"
                  value={values.url}
                  type="url"
                  onIonChange={handleChange}
                  required
                  />
               </IonItem>
               <IonRow>
                   <IonCol>
                      <IonButton
                        type="submit"
                        color="primary"
                        expand="block"
                        onClick={handleSubmit}
                      >
                          Submit
                      </IonButton>
                   </IonCol>
               </IonRow>
           </IonContent>
        </IonPage>
    )
}

export default Submit