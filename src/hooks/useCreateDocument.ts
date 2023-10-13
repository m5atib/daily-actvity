import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { serverTimestamp } from "firebase/firestore";
import { createDocumentAPI } from "../api/firestore";
import { CreatedDocument } from "./types";
import useAuth from "../context/authentication/useAuth";

interface UseCreateDocumentProps {
  collectionName: string;
  successCallback: (response: CreatedDocument) => void;
}

const useCreateDocument = <T>({
  collectionName,
  successCallback,
}: UseCreateDocumentProps) => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: Partial<T>) => {
      return createDocumentAPI({
        collectionName,
        data: {
          ...data,
          createdDate: serverTimestamp(),
          createdBy: user?.uid,
        },
      });
    },
    mutationKey: ["createDocument", collectionName],
    onSuccess: (response: CreatedDocument) => {
      successCallback(response);
    },
    onError: (err: FirebaseError) => {},
    onMutate: () => {},
  });
};

export default useCreateDocument;
