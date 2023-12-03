import { z } from 'zod'

const ProductPositionSchema = z.object({
  positionId: z.string().min(1),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  productId: z.string().min(1),
  quantity: z.number().positive(),
})

export const ProductPositionsSchema = ProductPositionSchema.array()

export type ProductPosition = z.infer<typeof ProductPositionSchema>
