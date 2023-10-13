import { fs } from "./firebase";
import {
  doc,
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  updateDoc,
  increment,
  deleteField,
  getDoc,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  CreateDocumentAPIParams,
  DeleteDocumentAPIParams,
  DeleteDocumentFieldAPIParams,
  GetDocumentAPIParams,
  IncrementDocumentFieldAPIParams,
  ReadCollectionAPIParams,
  UpdateDocumentAPIParams,
} from "./types";
import { log } from "./utils";

export const createDocumentAPI = async (
  params: CreateDocumentAPIParams
): Promise<DocumentReference<DocumentData>> => {
  log(`🚀 ~ CREATE : [${params.collectionName}]`);

  const collectionRef = collection(fs, params.collectionName);
  return await addDoc(collectionRef, params.data);
};

export const updateDocumentAPI = async (
  params: UpdateDocumentAPIParams
): Promise<void> => {
  log(`🚀 ~ UPDATE : [${params.documentId}] : [${params.collectionName}]`);

  const docReference = doc(fs, params.collectionName, params.documentId);

  return await updateDoc(docReference, params.data);
};

export const incrementDocumentFieldAPI = async (
  params: IncrementDocumentFieldAPIParams
): Promise<void> => {
  log(
    `🚀 ~ INCREMENT FIELD : [${params.field}] = [${params.field}] + (${params.byNumber}) : [${params.documentId}] : [${params.collectionName}] `
  );

  const docReference = doc(fs, params.collectionName, params.documentId);
  return await updateDoc(docReference, {
    [params.field]: increment(params.byNumber),
  });
};

export const deleteDocumentFieldAPI = async (
  params: DeleteDocumentFieldAPIParams
): Promise<void> => {
  log(
    `🚀 ~ DELETE FIELD : [${params.documentId}] : [${params.field}] : [${params.collectionName}]`
  );

  const docReference = doc(fs, params.collectionName, params.documentId);

  return await updateDoc(docReference, {
    [params.field]: deleteField(),
  });
};

export const getDocumentAPI = async <T>(
  params: GetDocumentAPIParams
): Promise<T> => {
  log(`🚀 ~ GET : [${params.documentId}] : [${params.collectionName}]`);

  const docRef = doc(fs, params.collectionName, params.documentId);
  const docSnap = await getDoc(docRef);

  return { id: docSnap.id, ...docSnap.data() } as T;
};

export const deleteDocumentAPI = async (
  params: DeleteDocumentAPIParams
): Promise<void> => {
  const docRef = doc(fs, params.collectionName, params.documentId);

  log(`🚀 ~ DELETE : [${params.documentId}] : [${params.collectionName}]`);

  return await deleteDoc(docRef);
};

export const readCollectionAPI = async <T>(
  params: ReadCollectionAPIParams
): Promise<T[]> => {
  log(`🚀 ~ READ : [${params.collectionName}]`);
  const collectionRef = collection(fs, params.collectionName);
  const constraints = params?.constraints?.filter(Boolean) || [];
  const queryRef = query(collectionRef, ...constraints);
  const snap = await getDocs(queryRef);

  return snap.docs.map((document) => {
    const docData = document.data();
    const docId = document.id;
    return { ...docData, id: docId } as T;
  });
};
