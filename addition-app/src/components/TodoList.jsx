import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react"

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const { user } = useUser()

  const fetchTasks = async () => {
    const { data } = await axios.get("/api/getTasks", {
      headers: { Authorization: `Bearer ${user.id}` }, // Send user ID to identify tasks
    })
    setTasks(data)
  }

  useEffect(() => {
    if (user) {
      fetchTasks()
    }
  }, [user])

  const addTask = async () => {
    if (!newTask) return
    await axios.post("/api/addTask", { text: newTask, userId: user.id })
    setNewTask("")
    fetchTasks()
  }

  const clearTask = async () => {
    setNewTask("")
  }

  return (
    <>
      <SignedOut>
        <div className="w-full h-lvh mt-[-50px] flex items-center content-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="absolute top-5 right-5">
          <UserButton />
        </div>
        <div className="h-full w-full p-2 flex flex-col items-center content-center">
          <ul className="self-start">
            {tasks.map(task => (
              <li key={task._id}>
                <div className="flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>

                  <span className="text-sm font-medium"> {task.text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-1 w-full p-6 ">
            <div className="overflow-hidden rounded-lg ">
              <textarea
                id="OrderNotes"
                className="w-full p-2 resize-none border-none align-top focus:ring-0 sm:text-sm rounded-lg"
                rows="4"
                placeholder="Enter your notes here..."
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                style={{ border: "1px solid black" }}
              ></textarea>

              <div className="flex items-center justify-end gap-2 bg-white p-3">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                  onClick={clearTask}
                >
                  Clear
                </button>

                <button
                  type="button"
                  className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                  onClick={addTask}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
}

export default TodoList
