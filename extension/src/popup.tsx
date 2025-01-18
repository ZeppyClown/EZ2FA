import { useEffect, useState } from "react"

import "./styles.css"

import { AuthForm } from "~components/auth-form"
import { LogoutButton } from "~components/log-out-btn"
import { SyncForm } from "~components/sync-form"
import { useFirebaseUser } from "~hooks/firebase-user"

function IndexPopup() {
  const [url, setUrl] = useState("")
  const { user, isLoading } = useFirebaseUser()

  useEffect(() => {
    const getCurrentUrl = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })

      const origin = new URL(tab.url).origin

      setUrl(origin)
    }

    getCurrentUrl()
  }, [])

  if (isLoading) {
    return (
      <div className="w-[400px] h-[300px] flex flex-col items-center justify-center">
        <p>Loading</p>
      </div>
    )
  }

  return (
    <div className="w-[400px] h-[300px] flex flex-col items-center justify-center">
      {user ? (
        <>
          <SyncForm />
          <LogoutButton />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  )
}

export default IndexPopup
