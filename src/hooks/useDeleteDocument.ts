import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocumentAPI } from "../api/firestore";
import { FirebaseError } from "firebase/app";

interface UseDeleteDocumentProps {
  successCallback?: () => void;
  collectionName: string;
}
export const useDeleteDocument = ({
  collectionName,
  successCallback,
}: UseDeleteDocumentProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createDocument", collectionName],
    mutationFn: ({ documentId }: { documentId: string }) =>
      deleteDocumentAPI({ collectionName, documentId }),

    onSuccess: () => {
      queryClient.invalidateQueries(["getProductsCollection"]);

      successCallback?.();
    },

    onError: (err: FirebaseError) => {},

    onMutate: () => {},
  });
};
