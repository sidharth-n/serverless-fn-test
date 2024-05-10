import { MongoClient } from "mongodb"

export default async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI)
  const task = {
    text: req.body.text,
    completed: false,
    userId: req.body.userId, // Store the user ID with the task
  }
  try {
    await client.connect()
    const database = client.db("todoApp")
    const tasks = database.collection("tasks")
    const result = await tasks.insertOne(task)
    res.status(201).json(result)
  } finally {
    await client.close()
  }
}
