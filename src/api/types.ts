import { DocumentData, FieldValue, QueryConstraint } from "firebase/firestore";

export interface CreateDocumentAPIParams {
  collectionName: string;
  data: DocumentData;
}

export interface UpdateDocumentAPIParams {
  collectionName: string;
  data: { [key: string]: FieldValue | Partial<unknown> | undefined };
  documentId: string;
}

export interface IncrementDocumentFieldAPIParams {
  collectionName: string;
  documentId: string;
  field: string;
  byNumber: number;
}

export interface DeleteDocumentFieldAPIParams {
  collectionName: string;
  documentId: string;
  field: string;
}

export interface GetDocumentAPIParams {
  collectionName: string;
  documentId: string;
}

export interface DeleteDocumentAPIParams {
  collectionName: string;
  documentId: string;
}

export interface ReadCollectionAPIParams {
  collectionName: string;
  constraints?: QueryConstraint[];
}
