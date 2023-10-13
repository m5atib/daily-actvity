import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  QueryConstraint,
  Timestamp,
  endBefore,
  limit,
  limitToLast,
  orderBy,
  startAfter,
  startAt,
} from "firebase/firestore";
import { readCollectionAPI } from "../api/firestore";
import useGetCollection from "./useGetCollection";
import { FirebaseError } from "firebase/app";
import { ItemWithCreatedDate } from "./types";

export interface UseInfiniteCollectionProps<T> {
  collectionName: string;
  itemsPerPage: number;
  filters?: QueryConstraint[];
  enabled?: boolean;
  configGetInitial?: UseQueryOptions<
    ItemWithCreatedDate<T>[],
    FirebaseError,
    ItemWithCreatedDate<T>[],
    string[]
  >;

  configInfinite?: UseInfiniteQueryOptions<
    ItemWithCreatedDate<T>[],
    FirebaseError,
    ItemWithCreatedDate<T>[],
    ItemWithCreatedDate<T>[],
    string[]
  >;
}

const useInfiniteCollection = <T>({
  collectionName,
  itemsPerPage = 10,
  filters = [],
  configGetInitial,
  enabled = true,
  configInfinite,
}: UseInfiniteCollectionProps<ItemWithCreatedDate<T>>) => {
  const {
    data: initialData,
    isSuccess: isSuccessFetchingInitialData,
    isFetching: isFetchingInitialData,
  } = useGetCollection<ItemWithCreatedDate<T>>({
    collectionName,
    filters: [orderBy("createdDate", "desc"), limit(1), ...filters],
    config: {
      enabled,
      queryKey: ["getOneTimeForInfinite", collectionName],
      ...configGetInitial,
    },
  });

  const getInitialParams = (createdDate: Timestamp | undefined) => {
    if (!createdDate) return false;

    return [
      orderBy("createdDate", "desc"),
      limit(itemsPerPage),
      startAt(createdDate),
      ...filters,
    ];
  };

  const getNextParams = (createdDate: Timestamp | undefined) => {
    if (!createdDate) return false;

    return [
      orderBy("createdDate", "desc"),
      limit(itemsPerPage),
      startAfter(createdDate),
      ...filters,
    ];
  };

  const getPreviousParams = (createdDate: Timestamp | undefined) => {
    if (!createdDate) return false;

    return [
      orderBy("createdDate", "desc"),
      limitToLast(itemsPerPage),
      endBefore(createdDate),
      ...filters,
    ];
  };

  return useInfiniteQuery({
    ...configInfinite,
    enabled:
      !!initialData?.length &&
      isSuccessFetchingInitialData &&
      !isFetchingInitialData,
    queryFn: ({
      pageParam = getInitialParams(initialData?.at(0)?.createdDate),
    }) =>
      readCollectionAPI<ItemWithCreatedDate<T>>({
        collectionName,
        constraints: pageParam,
      }),
    getNextPageParam: (pageData) =>
      getNextParams(pageData?.at(-1)?.createdDate),
    getPreviousPageParam: (pageData) =>
      getPreviousParams(pageData?.at(0)?.createdDate),
  });
};

export default useInfiniteCollection;
