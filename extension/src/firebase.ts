// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const clientCredentials = {
  apiKey: process.env.PLASMO_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PLASMO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PLASMO_PUBLIC_FIREBASE_APP_ID
}

const firebase_app = getApps().length
  ? getApps()[0]
  : initializeApp(clientCredentials)

export const auth = getAuth(firebase_app)
export const db = getFirestore(firebase_app)
export const googleAuth = new GoogleAuthProvider()

export default firebase_app
