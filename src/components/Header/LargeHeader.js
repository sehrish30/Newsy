import React from 'react'
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react'

const LargeHeader = ({title}) => {
    return (
        <IonHeader collapse="condense">
            <IonToolbar
             color="primary"
             style={{
                 background: "#30475e",
                 color: "#cbaf87"
             }}
             >
                <IonTitle size="large">{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default LargeHeader
