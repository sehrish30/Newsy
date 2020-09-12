import React from 'react'
import {IonPage, IonContent} from '@ionic/react'
import SmallHeader from '../../components/Header/SmallHeader';
import LargeHeader from '../../components/Header/LargeHeader';
import LinkList from '../../components/Link/LinkList';

const News = (props) => {
    return (
        <IonPage >
          <SmallHeader title="Newsy"/>
           <IonContent color="secondary" fullscreen>
               <LargeHeader title="Newsy"/>
              <LinkList location={props.location} /> 
           </IonContent>
        </IonPage>
    )
}

export default News


