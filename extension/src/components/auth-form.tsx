// src/components/AuthForm.tsx

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import { useState } from "react"

import { auth } from "~firebase"
import { useFirebaseUser } from "~hooks/firebase-user"

export function AuthForm() {
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const { isLoading, onLogin } = useFirebaseUser()

  const signIn = async (e: any) => {
    if (!email || !password)
      return console.log("Please enter email and password")

    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      onLogin()
    }
  }

  const signUp = async (e: any) => {
    try {
      if (!email || !password || !confirmPassword)
        return console.log("Please enter email and password")

      if (password !== confirmPassword)
        return console.log("Passwords do not match")

      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <div className="w-full h-full p-2 flex flex-col gap-2 rounded-md border-gray-300 border-2">
      <h1 className="text-xl font-bold text-center">
        {showLogin ? "Login" : "Sign Up"}
      </h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border-gray-300 border-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border-gray-300 border-2 rounded-md"
      />
      {!showLogin && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          className="p-2 border-gray-300 border-2 rounded-md"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      <button
        onClick={showLogin ? signIn : signUp}
        className="p-2 bg-blue-500 text-white rounded-md"
        disabled={isLoading}>
        {showLogin ? "Login" : "Sign Up"}
      </button>
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="p-2 text-blue-500 bg-white rounded-md border-blue-500 border-2">
        {showLogin ? "Sign Up" : "Login"}
      </button>
    </div>
  )
}
