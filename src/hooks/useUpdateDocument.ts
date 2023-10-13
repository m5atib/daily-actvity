import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { FieldValue } from "firebase/firestore";
import { updateDocumentAPI } from "../api/firestore";
import { FirebaseError } from "firebase/app";

interface UseUpdateDocumentProps {
  collectionName: string;
  documentId: string;
  options?: UseMutationOptions<
    void,
    FirebaseError,
    {
      [key: string]: FieldValue | Partial<unknown> | undefined;
    }
  >;
}

const useUpdateDocument = ({
  collectionName,
  documentId,
  options = {},
}: UseUpdateDocumentProps) => {
  const {
    onSuccess: successCallback,
    onError: errorCallback,
    onMutate: mutateCallback,
    ...restOfOptions
  } = options;

  return useMutation({
    mutationFn: (data: {
      [key: string]: FieldValue | Partial<unknown> | undefined;
    }) => {
      return updateDocumentAPI({
        collectionName,
        documentId,
        data,
      });
    },
    mutationKey: ["updateDocument", collectionName],
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

export default useUpdateDocument;
