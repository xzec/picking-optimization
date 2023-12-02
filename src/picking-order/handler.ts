import type { RequestHandler } from 'express'

const handler: RequestHandler = (req, res) => {
  console.log(req.body)
  res.send(req.body)
}

export default handler
