import { MongoClient } from "mongodb"

export default async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI)
  // Correctly parse the user ID from the Authorization header
  const userId = req.headers.authorization?.split(" ")[1]
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    await client.connect()
    const database = client.db("todoApp")
    const tasks = database.collection("tasks")
    const query = { userId } // Ensure this matches the stored document's userId
    const taskList = await tasks.find(query).toArray()
    res.status(200).json(taskList)
  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    await client.close()
  }
}
