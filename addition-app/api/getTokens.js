import { MongoClient } from "mongodb"

export default async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    const database = client.db("todoApp")
    const tokens = database.collection("tokens")
    const tokenList = await tokens.find().toArray()
    const tokenNumbers = tokenList.map(token => token.number)
    res.status(200).json(tokenNumbers)
  } catch (error) {
    console.error("Database error:", error)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    await client.close()
  }
}
