import { useFirebaseUser } from "~hooks/firebase-user"

export const LogoutButton = () => {
  const { onLogout } = useFirebaseUser()

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={onLogout}>
      Logout
    </button>
  )
}
