import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { serverTimestamp } from "firebase/firestore";
import { updateDocumentAPI } from "../api/firestore";
import useAuth from "../context/authentication/useAuth";

interface UseUpdateDocumentProps {
  collectionName: string;
  documentId: string | undefined;
  successCallback: () => void;
}

const useUpdateDocument = <T>({
  collectionName,
  documentId,
  successCallback,
}: UseUpdateDocumentProps) => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: T) => {
      return updateDocumentAPI({
        collectionName,
        documentId: documentId || "",
        data: {
          ...data,
          updatedDate: serverTimestamp(),
          updatedBy: user?.phoneNumber,
        },
      });
    },
    mutationKey: ["updateDocument", collectionName],
    onSuccess: () => {
      successCallback();
    },
    onError: (err: FirebaseError) => {},
    onMutate: () => {},
  });
};

export default useUpdateDocument;
