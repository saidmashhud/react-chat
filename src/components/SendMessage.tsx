import {
  FormEventHandler,
  useState,
  ChangeEventHandler,
  RefObject,
} from 'react'
import { toast } from 'react-hot-toast'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db, auth } from 'app/firebase'

interface ISendMessageProps {
  scroll: RefObject<HTMLSpanElement>
}

function SendMessage({ scroll }: ISendMessageProps) {
  const [message, setMessage] = useState('')

  const sendMessage: FormEventHandler = async (event) => {
    event.preventDefault()

    if (message.trim() === '') {
      toast.error('Enter valid message')
      return
    }

    if (!auth.currentUser) return
    const { uid, displayName, photoURL } = auth.currentUser

    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    })
    setMessage('')
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const changeMessageHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setMessage(event.target.value)
  }

  return (
    <form className='send-message' onSubmit={sendMessage}>
      <label htmlFor='messageInput' hidden>
        Enter Message
      </label>
      <input
        id='messageInput'
        name='messageInput'
        type='text'
        value={message}
        onChange={changeMessageHandler}
        className='form-input__input'
        placeholder='type message...'
      />
      <button type='submit'>Send</button>
    </form>
  )
}

export default SendMessage
