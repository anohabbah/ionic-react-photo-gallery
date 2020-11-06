import React from 'react';
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonImg, IonCol
} from '@ionic/react';
import { camera } from 'ionicons/icons';

import { usePhotoGallery } from "../hooks/usePhotoGallery";

import './Tab2.css';

const Tab2: React.FC = () => {
    const { takePhoto, photos } = usePhotoGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonGrid>
              <IonRow>
                  {photos.map((photo, idx) => (
                      <IonCol key={idx} size="6">
                          <IonImg src={photo.webviewPath} />
                      </IonCol>
                  ))}
              </IonRow>
          </IonGrid>

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
