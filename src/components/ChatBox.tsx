import { useEffect, useState, useRef } from 'react'
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'

import { db } from 'app/firebase'
import { IMessage } from 'app/types'

import Message from './Message'
import SendMessage from './SendMessage'
function ChatBox() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const scroll = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50))

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages: IMessage[] = []
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...(doc.data() as IMessage), id: doc.id })
      })
      setMessages(messages)
    })

    return unsubscribe
  }, [])

  return (
    <main className='chat-box'>
      <div className='messages-wrapper'>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  )
}

export default ChatBox
