import { useEffect, useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  useEffect(() => {
    const getCurrentUrl = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })

      const orign = new URL(tab.url).origin

      console.log("Current URL: ", orign)
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
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
