import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getDocumentAPI } from "../api/firestore";
import { FirebaseError } from "firebase/app";

interface UseGetDocumentProps<T> {
  collectionName: string;
  documentId: string;
  options?: Omit<
    UseQueryOptions<T, FirebaseError, T, string[]>,
    "initialData"
  > & {
    initialData?: (() => undefined) | undefined;
  };
}

const useGetDocument = <T,>({
  collectionName,
  documentId,
  options = {},
}: UseGetDocumentProps<T>) => {
  return useQuery(
    ["getDocument", documentId],
    () =>
      getDocumentAPI<T>({
        collectionName,
        documentId,
      }),
    options
  );
};

export default useGetDocument;
