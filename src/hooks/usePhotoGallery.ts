import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";

const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
const { get, set } = useStorage();
const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
    const {getPhoto} = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const loadSaved = async () => {
            const photosString = await get(PHOTO_STORAGE);
            const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
            for (let photo of photos) {
                const file = await readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
            setPhotos(photos);
        };
        loadSaved();
    }, []);

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

        set(PHOTO_STORAGE, JSON.stringify(newPhotos));
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
