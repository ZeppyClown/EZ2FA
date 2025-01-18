import { useEffect, useState } from "react"

import "./styles.css"

import { AuthForm } from "~components/auth-form"
import { useFirebaseUser } from "~hooks/firebase-user"

function IndexPopup() {
  const [url, setUrl] = useState("")
  const { user } = useFirebaseUser()

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

  return (
    <div className="w-[400px] h-[300px] flex flex-col items-center justify-center">
      {url && <p>Current URL: {url}</p>}
      {!user ? <AuthForm /> : null}
    </div>
  )
}

export default IndexPopup
