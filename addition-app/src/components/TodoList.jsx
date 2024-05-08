import React, { useState, useEffect } from "react"
import axios from "axios"

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  const fetchTasks = async () => {
    const { data } = await axios.get("/api/getTasks")
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async () => {
    if (!newTask) return
    await axios.post("/api/addTask", { text: newTask })
    setNewTask("")
    fetchTasks()
  }

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
