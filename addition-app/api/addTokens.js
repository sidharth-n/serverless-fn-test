import { MongoClient } from "mongodb"

export default async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI)
  const tokens = req.body.tokens.map(number => ({ number }))

  try {
    await client.connect()
    const database = client.db("todoApp")
    const tokenCollection = database.collection("tokens")
    const result = await tokenCollection.insertMany(tokens)
    res.status(201).json(result)
  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    await client.close()
  }
}
