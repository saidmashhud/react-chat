import { Timestamp } from 'firebase/firestore'

export interface IMessage {
  text: string
  name: string
  avatar: string
  uid: string
  createdAt: Timestamp
  id: string
}
