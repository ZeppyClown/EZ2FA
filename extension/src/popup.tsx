import { useEffect, useState } from "react"

function IndexPopup() {
  const [url, setUrl] = useState("")

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
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      {url && <p>Current URL: {url}</p>}
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
