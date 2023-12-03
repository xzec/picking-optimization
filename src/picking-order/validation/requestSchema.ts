import { z } from 'zod'

export const PickingOrderRequestSchema = z.object({
  products: z.string().min(1).array().min(1),
  startingPosition: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }),
})
