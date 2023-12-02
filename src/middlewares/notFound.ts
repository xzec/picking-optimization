import { type NextFunction, type Request, type Response } from 'express'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  const error = new Error(`Resource not found "${req.originalUrl}"`)
  next(error.message)
}

export default notFound
