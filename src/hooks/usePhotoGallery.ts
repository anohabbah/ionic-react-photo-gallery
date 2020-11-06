import {useCamera} from "@ionic/react-hooks/camera";
import {CameraPhoto, CameraResultType, CameraSource} from "@capacitor/core";
import {useState} from "react";

export function usePhotoGallery() {
    const {getPhoto} = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);

    const takePhoto = async () => {
        const cameraPhoto: CameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });

        const filename = new Date().getTime() + '.jpg';
        const newPhotos: Photo[] = [
            {
                filepath: filename,
                webviewPath: cameraPhoto.webPath,
            },
            ...photos
        ];
        setPhotos(newPhotos);
    };

    return {takePhoto, photos};
}

export interface Photo {
    filepath: string;
    webviewPath: string | undefined;
}
