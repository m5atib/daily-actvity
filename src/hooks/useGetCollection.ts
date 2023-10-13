import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { readCollectionAPI } from "../api/firestore";
import { QueryConstraint } from "firebase/firestore";

interface UseGetCollectionProps<T> {
  collectionName: string;
  config?: UseQueryOptions<T[], FirebaseError, T[], string[]>;
  filters?: QueryConstraint[];
}
const useGetCollection = <T>({
  collectionName,
  filters,
  config,
}: UseGetCollectionProps<T>) => {
  return useQuery({
    queryFn: () =>
      readCollectionAPI<T>({
        collectionName,
        constraints: filters,
      }),
    ...config,
  });
};

export default useGetCollection;
