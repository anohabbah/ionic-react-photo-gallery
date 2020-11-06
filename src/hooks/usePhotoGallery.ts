import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import {save} from "ionicons/icons";

const { deleteFile, getUri, readFile, writeFile } = useFilesystem();

export function usePhotoGallery() {
    const {getPhoto} = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);

    const takePhoto = async () => {
        const cameraPhoto: CameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });

        const filename: string = new Date().getTime() + '.jpg';
        const savedImage: Photo = await savePicture(cameraPhoto, filename);
        const newPhotos: Photo[] = [savedImage, ...photos];
        setPhotos(newPhotos);
    };

    return {takePhoto, photos};
}

export interface Photo {
    filepath: string;
    webviewPath: string;
}

async function savePicture(photo: CameraPhoto, filename: string): Promise<Photo> {
    const base64Data = await base64FromPath(photo.webPath!);

    const savedFile = await writeFile({path: filename, data: base64Data, directory: FilesystemDirectory.Data});

    return { filepath: filename, webviewPath: photo.webPath!}
}
