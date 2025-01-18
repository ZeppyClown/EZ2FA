import { useEffect, useState } from "react"

import "./styles.css"

import { LogoutButton } from "~components/log-out-btn"
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

  useEffect(() => {
    if (user || isLoading) return
    chrome.runtime.openOptionsPage(() => {
      window.close()
    })
  }, [user, isLoading])

  return (
    <div className="w-[400px] h-[300px] flex flex-col items-center justify-center">
      {window.location.href}
      {url && <p>Current URL: {url}</p>}
      {user && (
        <>
          <p>Logged in as {user.email}</p>
          <LogoutButton />
        </>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  )
}

export default IndexPopup
