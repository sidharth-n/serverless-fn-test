import { MongoClient } from "mongodb"

export default async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  try {
    await client.connect()
    const database = client.db("todoApp")
    const tasks = database.collection("tasks")
    const query = {}
    const taskList = await tasks.find(query).toArray()
    res.status(200).json(taskList)
  } finally {
    await client.close()
  }
}
