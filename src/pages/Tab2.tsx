import React from 'react';
import {IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { camera } from 'ionicons/icons';

import './Tab2.css';

const takePhoto = () => {};

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => takePhoto()}>
                  <IonIcon icon={camera} />
              </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
