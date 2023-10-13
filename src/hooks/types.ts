import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { Timestamp } from "firebase/firestore";

export type ItemWithCreatedDate<T> = T & { createdDate: Timestamp };

export type InfiniteResult<T> = UseInfiniteQueryResult<
  ItemWithCreatedDate<ItemWithCreatedDate<T>>[],
  FirebaseError
>;
