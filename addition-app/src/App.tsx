import { useState } from "react"

function App() {
  const [numberA, setNumberA] = useState("")
  const [numberB, setNumberB] = useState("")
  const [result, setResult] = useState(null)

  const handleCalculate = async () => {
    try {
      const response = await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberA, numberB }),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      console.error("Failed to fetch data:", error)
      // Optionally set an error state to show in the UI
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-5">
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            value={numberA}
            onChange={e => setNumberA(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter number A"
          />
          <input
            type="number"
            value={numberB}
            onChange={e => setNumberB(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            placeholder="Enter number B"
          />
          <button onClick={handleCalculate} className="btn btn-primary">
            Add
          </button>
          {result !== null && (
            <div className="text-lg font-semibold">Result: {result}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
