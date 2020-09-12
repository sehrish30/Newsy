import React, {useContext, useState, useEffect, useCallback} from 'react'
import {dbLinksRef} from "../firebase/firebase";
import {Plugins} from "@capacitor/core";
import UserContext from "../contexts/UserContext"
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import { closeCircleOutline } from 'ionicons/icons';
import LinkItem from '../components/Link/LinkItem';
import '../css/styles.css';


const {Browser} = Plugins;

const Link = (props) => {
  
    const {user} = useContext(UserContext);
    const [link, setLink] = useState(null);
    const linkId = props.match.params.linkId;
    const linkRef = dbLinksRef.doc(linkId);

    const getLink = useCallback(() =>{
        linkRef.get().then((doc) => {
            setLink({...doc.data(), id:doc.id})
        })
    },[linkRef])

    useEffect(()=>{
         //Check when link is mounted call getLink
         getLink();
    },[linkId, getLink]);

    const postedByAuthUser =(link)=>{
        return user?.uid === link.postedBy.id;
    }

    const openBrowser = async () =>{
      await Browser.open({
          url: link.url
      })
    }

    const handleDeleteLink = () =>{
     linkRef
      .delete()
      .then(()=> {
          console.log(`Document with Id ${link.id} deleted`);
      })
      .catch(err =>{
          console.error("Error deleting document", err);
      });
      props.history.push('/');
    }

    return (
        <IonPage>
            <NavHeader
            title={link && link.description}
            option = {link && postedByAuthUser(link)}
            icon={closeCircleOutline}
            action ={handleDeleteLink}
             />
             <IonContent color="light">
             {link && (
                 <>
                     <IonGrid>
                         <IonRow>
                             <IonCol>
                                 <LinkItem link={link} browser= {openBrowser}/>
                             </IonCol>
                         </IonRow>
                     </IonGrid>
                 </>
             )}
             

             </IonContent>
        </IonPage>
    )
}

export default Link
