import z from 'zod'

export const env = z
  .object({
    PORT: z
      .string()
      .min(1)
      .transform((port) => parseInt(port, 10))
      .refine((port) => !isNaN(port), {
        message: 'PORT must be a valid number',
      })
      .optional(),
    PRODUCT_API_BASE_URL: z
      .string()
      .url()
      .transform((url) => (url.endsWith('/') ? url.slice(0, -1) : url)),
    PRODUCT_API_KEY: z.string().min(1),
  })
  .parse({
    PORT: process.env.PORT,
    PRODUCT_API_BASE_URL: process.env.PRODUCT_API_BASE_URL,
    PRODUCT_API_KEY: process.env.PRODUCT_API_KEY,
  })
