import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth"

import { auth } from "~firebase"
import { useFirebaseUser } from "~hooks/firebase-user"

export const AuthForm = () => {
  const { isLoading, onLogin } = useFirebaseUser()

  const signIn = async () => {
    await signInWithRedirect(auth, new GoogleAuthProvider())
    onLogin()
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={signIn}>
        Sign in with Google
      </button>
    </div>
  )
}
