export default function handler(req, res) {
  if (req.method === "POST") {
    const { numberA, numberB } = req.body
    const result = Number(numberA) + Number(numberB)
    res.status(200).json({ result })
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
