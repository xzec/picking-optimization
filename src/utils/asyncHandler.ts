import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from 'express'

export const asyncHandler =
  (
    fun: (req: Request, res: Response, next: NextFunction) => Promise<void>,
  ): RequestHandler =>
  (req, res, next) =>
    void Promise.resolve(fun(req, res, next)).catch(next)
