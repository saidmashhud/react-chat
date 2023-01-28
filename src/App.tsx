import { useAuthState } from 'react-firebase-hooks/auth'
import { Toaster } from 'react-hot-toast'

import { auth } from 'app/firebase'
import NavBar from 'components/NavBar'
import ChatBox from 'components/ChatBox'
import Welcome from 'components/Welcome'

import './App.css'

function App() {
  const [user] = useAuthState(auth)

  return (
    <>
      <div className='App'>
        <NavBar />
        {!user ? (
          <Welcome />
        ) : (
          <>
            <ChatBox />
          </>
        )}
      </div>
      <Toaster />
    </>
  )
}

export default App
