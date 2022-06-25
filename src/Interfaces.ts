import { FieldValue } from "firebase/firestore"

export interface TaskProp {
  name: string
  done: boolean
  timestamp?: FieldValue
  toggleTask?: any
  callback?: any
}

export interface Task {
  name: string
  done: boolean
  id: string
  timestamp: FieldValue
}
