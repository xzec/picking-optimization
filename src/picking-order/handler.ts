import type { RequestHandler } from 'express'
import { fetchProductPositions } from '~/picking-order/service'
import { asyncHandler, resolve } from '~/utils'
import { PickingOrderRequestSchema } from '~/picking-order/validation'
import { solve } from '~/picking-order/service'

const handler: RequestHandler = asyncHandler(async (req, res) => {
  const pickingOrderRequest = PickingOrderRequestSchema.safeParse(req.body)
  if (!pickingOrderRequest.success) {
    res
      .status(400)
      .send(
        `Invalid request body. Original error: ${pickingOrderRequest.error.toString()}`,
      )
    return
  }

  const { products, startingPosition } = pickingOrderRequest.data

  const [err, productPositions] = await resolve(fetchProductPositions(products))
  if (err) {
    res
      .status(502)
      .send(`Failed to fetch product positions. Original error: ${err.message}`)
    return
  }

  const pickingOrder = solve(startingPosition, productPositions)

  res.send(pickingOrder)
})

export default handler
