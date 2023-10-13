import { FirebaseError } from "firebase/app";
import { useQuery } from "@tanstack/react-query";
import { getDocumentAPI } from "../api/firestore";

interface UseFetchDocumentProps {
  collectionName: string;
  documentId: string | undefined;
  enabled?: boolean;
}
const useFetchDocument = <T,>({
  collectionName,
  documentId,
  enabled = true,
}: UseFetchDocumentProps) => {
  return useQuery({
    onError: (err: FirebaseError) => {},
    queryFn: () =>
      getDocumentAPI<T>({
        collectionName,
        documentId: documentId!,
      }),
    queryKey: ["getFetchDocument", collectionName, documentId],
    refetchOnWindowFocus: false,
    enabled: enabled && !!documentId,
  });
};

export default useFetchDocument;
