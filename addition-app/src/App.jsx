import React from "react"
import "./App.css"
import TodoList from "./components/TodoList"
import { ClerkProvider } from "@clerk/clerk-react"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <TodoList />
        </ClerkProvider>
      </header>
    </div>
  )
}

export default App
