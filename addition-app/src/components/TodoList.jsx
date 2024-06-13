import React, { useState, useEffect } from "react"
import axios from "axios"

function TokenSystem() {
  const [tokens, setTokens] = useState([])
  const [newToken, setNewToken] = useState("")

  const fetchTokens = async () => {
    try {
      const { data } = await axios.get("/api/getTokens")
      if (Array.isArray(data)) {
        setTokens(data)
      } else {
        console.error("Expected an array but got:", data)
      }
    } catch (error) {
      console.error("Error fetching tokens:", error)
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  const addToken = async () => {
    if (!newToken) return
    try {
      const tokensArray = newToken.split(" ").map(Number)
      await axios.post("/api/addTokens", { tokens: tokensArray })
      setNewToken("")
      fetchTokens()
    } catch (error) {
      console.error("Error adding token:", error)
    }
  }

  const clearToken = () => {
    setNewToken("")
  }

  return (
    <div className="h-full w-full p-2 flex flex-col items-center content-center">
      <ul className="self-start">
        {Array.isArray(tokens) &&
          tokens.map((token, index) => (
            <li key={index}>
              <div className="flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700">
                <span className="text-sm font-medium">Token No: {token}</span>
              </div>
            </li>
          ))}
      </ul>

      <div className="absolute bottom-1 w-full p-6">
        <div className="overflow-hidden rounded-lg">
          <textarea
            id="TokenInput"
            className="w-full p-2 resize-none border-none align-top focus:ring-0 sm:text-sm rounded-lg"
            rows="4"
            placeholder="Enter token numbers separated by space..."
            value={newToken}
            onChange={e => setNewToken(e.target.value)}
            style={{ border: "1px solid black" }}
          ></textarea>

          <div className="flex items-center justify-end gap-2 bg-white p-3">
            <button
              type="button"
              className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
              onClick={clearToken}
            >
              Clear
            </button>

            <button
              type="button"
              className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={addToken}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenSystem
