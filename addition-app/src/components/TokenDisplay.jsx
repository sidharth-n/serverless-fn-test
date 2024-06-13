import React, { useState, useEffect } from "react"
import axios from "axios"

function TokenDisplay() {
  const [tokens, setTokens] = useState([])

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

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Token No:</h1>
      <div className="text-xl font-medium text-center">{tokens.join(" ")}</div>
    </div>
  )
}

export default TokenDisplay
