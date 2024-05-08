const { MongoClient } = require("mongodb")

module.exports = async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const task = {
    text: req.body.text,
    completed: false,
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
