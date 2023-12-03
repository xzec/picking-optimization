import { type z } from 'zod'
import type { ProductPositionSchema } from '~/picking-order/validation'

export type ProductPosition = z.infer<typeof ProductPositionSchema>

export type Vector3 = {
  x: number
  y: number
  z: number
}

export type PickupPoint = Pick<ProductPosition, 'productId' | 'positionId'>

export type PickingOrder = {
  pickingOrder: PickupPoint[]
  distance: number
}
