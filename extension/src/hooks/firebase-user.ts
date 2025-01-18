import { onAuthStateChanged, type User } from "firebase/auth"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { auth } from "~firebase"

export const useFirebaseUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>(null)

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()

      await sendToBackground({
        name: "removeAuth",
        body: {}
      })
    }
  }

  const onLogin = async () => {
    if (!user) return

    const uid = user.uid

    // Get current user auth token
    return user.getIdToken(true).then(async (token) => {
      // Send token to background to save
      await sendToBackground({
        name: "saveAuth",
        body: {
          token,
          uid,
          refreshToken: user.refreshToken
        }
      })
    })
  }

  useEffect(() => {
    setUser(auth.currentUser)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      onLogin()
    }
  }, [user])

  return {
    isLoading,
    user,
    onLogin,
    onLogout
  }
}
