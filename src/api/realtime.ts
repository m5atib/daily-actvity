import {
  DataSnapshot,
  child,
  get,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import { db } from "./firebase";

export const writeData = async (path: string, data: unknown) => {
  const reference = ref(db, path);
  await set(reference, data);
};

export const getData = (
  path: string,
  callback: (data: DataSnapshot) => void,
  onlyOnce: boolean = false
) => {
  const docRef = ref(db, path);
  onValue(docRef, callback, {
    onlyOnce,
  });
};

export const getOnce = async (path: string): Promise<DataSnapshot> => {
  const dbRef = ref(db);
  const childRef = child(dbRef, path);
  const snapshot = await get(childRef);
  return snapshot;
};

export interface RTCreateDataBody {
  collection: string;
  data: object;
  path: string;
}

export const createData = async ({
  data,
  path,
}: RTCreateDataBody): Promise<void> => {
  const dbRef = ref(db);
  const updates = {
    [path]: data,
  };
  await update(dbRef, updates);
};
