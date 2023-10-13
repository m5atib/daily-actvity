import {
  UploadTaskSnapshot,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app, fs } from "./firebase";
import { QueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export interface FileWithPath extends File {
  readonly path?: string;
}

interface UploadImagesListAPIProps {
  documentId: string;
  images: FileWithPath[];
  collectionName: string;
  queryClient: QueryClient;
  showImageUploadedMessage: (url: string, name: string) => void;
}

export const uplaodImagesListAPI = ({
  documentId,
  images,
  collectionName,
  queryClient,
  showImageUploadedMessage,
}: UploadImagesListAPIProps) => {
  const imageUploadPromises = images.map((image: FileWithPath) => {
    const storageReference = getStorage(
      app,
      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DIRECTORY
    );
    const imageName = new Date().getTime() + image.name;
    const imageReference = ref(storageReference, imageName);

    const uploadTask = uploadBytesResumable(imageReference, image);

    const nextOrObserver = (snap: UploadTaskSnapshot) => {
      const { bytesTransferred, totalBytes } = snap;
      const progress = Math.round((bytesTransferred / totalBytes) * 100);
      queryClient.setQueryData(["uploadingImage", image.name], progress);
    };

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        nextOrObserver,
        (error) => {
          console.error(`Failed to upload ${image.name}`, error);
          reject(error);
        },
        () =>
          getDownloadURL(imageReference).then(async (url) => {
            const productRef = doc(fs, collectionName, documentId);
            return updateDoc(productRef, {
              images: arrayUnion(url),
            }).then(() => resolve(showImageUploadedMessage(url, image.name)));
          })
      );
    });
  });

  return Promise.all(imageUploadPromises);
};
