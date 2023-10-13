import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";

export type ItemWithCreatedDate<T> = T & { createdDate: Timestamp };

export type InfiniteResult<T> = UseInfiniteQueryResult<
  ItemWithCreatedDate<ItemWithCreatedDate<T>>[],
  FirebaseError
>;

export type CreatedDocument = DocumentReference<DocumentData>;
