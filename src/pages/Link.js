import React, {useContext, useState, useEffect, useCallback} from 'react'
import {dbLinksRef} from "../firebase/firebase";
import {Plugins} from "@capacitor/core";
import UserContext from "../contexts/UserContext"
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import NavHeader from '../components/Header/NavHeader';
import { closeCircleOutline } from 'ionicons/icons';
import LinkItem from '../components/Link/LinkItem';

import CommentModal from '../components/Link/CommentModal';
import LinkComment from '../components/Link/LinkComment';

const {Browser} = Plugins;

const Link = (props) => {
  
    const {user} = useContext(UserContext);
    const [link, setLink] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const linkId = props.match.params.linkId;
    const linkRef = dbLinksRef.doc(linkId);

    const hanldeOpenModal =() => {
        if(!user){
          props.history.push('/login');
        }else{
            setShowModal(true);
        }
    }

    const handleCloseModal = () =>{
        setShowModal(false);
    }

    const handleAddComment = (commentText) => {
        if(!user){
            props.history.push("/login");
        }else{
            linkRef.get().then((doc) =>{
                if(doc.exists){
                    const previousComments = doc.data().comments;
                    const newComment = {
                        postedBy : {id: user.uid, name: user.displayName},
                        created: Date.now(),
                        text: commentText
                    };
                    const updatedComments = [...previousComments, newComment];
                    linkRef.update({comments: updatedComments});
                    setLink((prevState)=> ({
                        ...prevState,
                        comments: updatedComments
                    }))
                }
            });
            setShowModal(false);
        }
    }

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
             <CommentModal
              isOpen= {showModal}
              title="New Comment"
              sendAction={handleAddComment}
              closeAction={handleCloseModal}
              />
             {link && (
                 <>
                     <IonGrid>
                         <IonRow>
                             <IonCol class="ion-text-center">
                                 <LinkItem  link={link} browser= {openBrowser}/>
                                 <IonButton onClick={() => handleAddVote()} size="small" >UpVote</IonButton>
                                 <IonButton onClick={() => hanldeOpenModal()} size="small" fill="outline">
                                   Comment
                                 </IonButton>
                             </IonCol>
                         </IonRow>
                     </IonGrid>
                     {link.comments.map((comment, index)=>(
                         <LinkComment
                          key={index}
                          comment={comment}
                          link={link}
                          setLink={setLink}
                          />
                     ))}
                 </>
             )}
             

             </IonContent>
        </IonPage>
    )
}

export default Link
