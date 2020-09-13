import React, {useContext, useState} from 'react'
import UserContext from '../../contexts/UserContext'
import {dbLinksRef} from "../../firebase/firebase";
import CommentModal from './CommentModal';
import { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { formatDistanceToNow } from 'date-fns';

const LinkComment = ({comment, link, setLink}) => {

    const {user} = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    const postedByAuthUser = user && user.uid === comment.postedBy.id;

    
    const handleCloseModal = () =>{
        setShowModal(false);
    }

    const handleEditComment = (commentText) => {
        const linkRef = dbLinksRef.doc(link.id);
        linkRef.get().then((doc) => {
          if (doc.exists) {
            const previousComments = doc.data().comments;
            const newComment = {
              postedBy: { id: user.uid, name: user.displayName },
              created: Date.now(),
              text: commentText,
            };
            const updatedComments = previousComments.map((item) =>
              item.created === comment.created ? newComment : item
            );
            linkRef.update({ comments: updatedComments });
            setLink((prevState) => ({
              ...prevState,
              comments: updatedComments,
            }));
          }
        });
        setShowModal(false);
    }
    const handleDeleteComment = () =>{
        const linkRef = dbLinksRef.doc(link.id);
        linkRef.get().then(doc => {
            if(doc.exists){
                const previousComments = doc.data().comments;
                const updatedComments = previousComments.filter(
                    item => item.created !== comment.created
                );
                linkRef.update({comments: updatedComments});
                setLink(prevState => ({
                    ...prevState, 
                    comments: updatedComments
                }))
            }
        })
    }

    return (
       <>
        <CommentModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction = {handleEditComment}
        closeAction = {handleCloseModal}
        comment = {comment}
        />
        <IonCard color="success">
        <IonCardContent color="success">
          <IonList lines="none">
            <IonItem color="success">
              <IonLabel class="ion-text-wrap" >
                <p 
                  style={{
                    alignItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: "normal",
                    color: '#9d65c9'
                  }}
                >
                  {comment.postedBy.name} {" | "}
                  {formatDistanceToNow(comment.created)}
                </p>
                <div className="ion-padding-vertical" 
                style={{
                    alignItems: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    fontFamily: "Cantata One, serif"
                    
                  }}
                >{comment.text}</div>
                {postedByAuthUser && (
                  <IonButton fill="outline" size="small" onClick={() => setShowModal(true)}>
                    Edit
                  </IonButton>
                )}
                {postedByAuthUser && (
                  <IonButton
                    size="small"
                    color="danger"
                    fill="outline"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    Delete
                  </IonButton>
                )}
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
       </>
    )
}

export default LinkComment
