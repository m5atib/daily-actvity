import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { deleteDocumentAPI } from "../api/firestore";
import { FirebaseError } from "firebase/app";

interface UseDeleteDocumentProps {
  options?: UseMutationOptions<void, FirebaseError, { documentId: string }>;
  collectionName: string;
}
export const useDeleteDocument = ({
  collectionName,
  options = {},
}: UseDeleteDocumentProps) => {
  const {
    onSuccess: successCallback,
    onError: errorCallback,
    onMutate: mutateCallback,
    ...restOfOptions
  } = options;

  return useMutation({
    mutationKey: ["deleteDocument", collectionName],
    mutationFn: ({ documentId }: { documentId: string }) =>
      deleteDocumentAPI({ collectionName, documentId }),

    onSuccess: (data, variables, context) => {
      successCallback?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      errorCallback?.(error, variables, context);
    },
    onMutate: (variables) => {
      mutateCallback?.(variables);
    },
    ...restOfOptions,
  });
};
