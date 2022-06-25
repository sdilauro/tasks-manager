import { db } from "../utils/firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore"
import { TaskProp } from "../Interfaces"

export const AddTaskToDB = async (taskName: string, collectionName: string) => {
  const collectionRef = collection(db, collectionName)
  const payload: TaskProp = {
    name: taskName,
    done: false,
    timestamp: serverTimestamp(),
  }
  await addDoc(collectionRef, payload)
}

export const deleteTaskOfDB = async (id: string, collectionName: string) => {
  const docRef = doc(db, collectionName, id)
  await deleteDoc(docRef)
}

export const toggleDoneDB = async (
  name: string,
  id: string,
  done: boolean,
  timestamp: FieldValue,
  collectionName: string
) => {
  const docRef = doc(db, collectionName, id)
  const payload = { name, done: !done, timestamp }
  setDoc(docRef, payload)
}

export const updateTaskNameDB = async (
  name: string,
  id: string,
  done: boolean,
  timestamp: FieldValue,
  collectionName: string
) => {
  const docRef = doc(db, collectionName, id)
  const payload = { name, done, timestamp }
  setDoc(docRef, payload)
}

export const queryTaskName = async (name: string, collectionName: string) => {
  const collectionRef = collection(db, collectionName)
  const q = query(collectionRef, where("name", "==", name))
  const snapshot = await getDocs(q)
  return snapshot.docs.length
}
