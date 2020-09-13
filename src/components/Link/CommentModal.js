import React, {useState, useEffect} from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonTextarea,
} from "@ionic/react";

const CommentModal = ({ isOpen, title, sendAction, closeAction, comment }) => {

  const [commentText, setCommentText]  = useState(
    comment ? comment.text : ""
  );
  

  function handleSendAction(item) {
    sendAction(item);
    setCommentText("");
  }

  const handleChange =event =>{
       console.log(event.target.value)
       const {value}= event.target; 
       setCommentText(value);
   }

  //  useEffect(() => { 
  //   setCommentText((prevComments)=>({
  //     ...prevComments
  //   }))
  //  }, [commentText])
  //  (e) => setCommentText(e.target.value)

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeAction}>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={closeAction}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => handleSendAction(commentText)}>
              Send
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  color="secondary">
        <IonTextarea
          onIonChange={handleChange}
          row={25}
          cols={25}
          placeholder="Your comment"
          // value={commentText}  
        />
      </IonContent>
    </IonModal>
  );
};

export default CommentModal;