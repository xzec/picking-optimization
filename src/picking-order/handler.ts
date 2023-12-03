import type { RequestHandler } from 'express'
import { fetchProductPositions } from './service'
import { asyncHandler, resolve } from '~/utils'
import { PickingOrderRequestSchema, type ProductPosition } from './validation'

const handler: RequestHandler = asyncHandler(async (req, res) => {
  const pickingOrder = PickingOrderRequestSchema.safeParse(req.body)
  if (!pickingOrder.success) {
    res
      .status(400)
      .send(
        `Invalid request body. Original error: ${pickingOrder.error.toString()}`,
      )
    return
  }

  const { products } = pickingOrder.data

  const [err, productPositions] = await resolve(fetchProductPositions(products))
  if (err) {
    res
      .status(502)
      .send(`Failed to fetch product positions. Original error: ${err.message}`)
    return
  }

  const productPositionsMap = new Map<string, ProductPosition[]>()

  productPositions.forEach((position) => {
    const { productId } = position
    if (!productPositionsMap.get(productId))
      productPositionsMap.set(productId, [])
    productPositionsMap.get(productId)!.push(position)
  })

  res.send(productPositions)
})

export default handler
