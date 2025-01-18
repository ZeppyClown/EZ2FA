// src/options.tsx
import { AuthForm } from "~components/auth-form"
import { useFirebaseUser } from "~hooks/firebase-user"

import "./styles.css"

export default function Options() {
  const { user, onLogout } = useFirebaseUser()

  return (
    <div className="mt-8">
      {!user && <AuthForm />}
      {user && <button onClick={onLogout}>Logout</button>}
    </div>
  )
}
