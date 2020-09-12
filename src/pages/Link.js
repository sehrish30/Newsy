import React, {useContext, useState, useEffect, useCallback} from 'react'
import {dbLinksRef} from "../firebase/firebase";
import {Plugins} from "@capacitor/core";
import UserContext from "../contexts/UserContext"
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import { closeCircleOutline } from 'ionicons/icons';
import LinkItem from '../components/Link/LinkItem';

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
         //Check when link is mounted get data of news
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

    const handleAddVote = () => {
        if(!user){
         props.history.push("/login");
        }else{
          linkRef.get().then((doc)=>{
              if(doc.exists){
                const previousVotes = doc.data().votes;
                const vote = {votedBy: {id: user.uid, name: user.displayName}};
                const updatedVotes = [...previousVotes, vote];
                const voteCount = updatedVotes.length;

                // Update firestore
                linkRef.update({votes: updatedVotes, voteCount});

                // Update link state
                setLink((prevState)=> ({
                    ...prevState,
                    votes: updatedVotes,
                    voteCount: voteCount
                }))
              }
          })
        }
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
                             <IonCol class="ion-text-center">
                                 <LinkItem  link={link} browser= {openBrowser}/>
                                 <IonButton onClick={() => handleAddVote()} size="small" >UpVote</IonButton>
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
