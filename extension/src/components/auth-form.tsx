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
    <div className="flex items-center justify-center w-full p-4 overflow-x-hidden rounded-xl overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="w-full max-w-2xl max-h-full">
        <div className="p-10 bg-white rounded-lg shadow">
          <div className="flex flex-row items-center justify-center">
            {!isLoading && (
              <span className="text-black font-bold text-3xl text-center">
                Login
              </span>
            )}
            {isLoading && (
              <span className="text-black font-bold text-3xl text-center">
                Loading...
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-white text-black">
            <button
              onClick={signIn}
              className="w-full p-4 bg-blue-500 text-white rounded-xl">
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
