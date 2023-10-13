import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { createDocumentAPI } from "../api/firestore";
import { FirebaseError } from "firebase/app";
import { CreatedDocument } from "./types";

interface UseCreateDocumentProps<T> {
  collectionName: string;
  options?: UseMutationOptions<CreatedDocument, FirebaseError, Partial<T>>;
}

const useCreateDocument = <T>({
  collectionName,
  options = {},
}: UseCreateDocumentProps<T>) => {
  const {
    onSuccess: successCallback,
    onError: errorCallback,
    onMutate: mutateCallback,
    ...restOfOptions
  } = options;
  return useMutation({
    mutationFn: (data: Partial<T>) => {
      return createDocumentAPI({
        collectionName,
        data,
      });
    },
    mutationKey: ["createDocument", collectionName],
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

export default useCreateDocument;
