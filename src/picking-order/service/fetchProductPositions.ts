import { env } from '~/env.mjs'
import { ProductPositionsSchema } from '~/picking-order/validation'
import { resolveAllSettled } from '~/utils'

export const fetchProductPositions = async (productIds: string[]) => {
  const promises = productIds.map((productId) =>
    fetch(
      `${env.PRODUCT_API_BASE_URL}/case-study/products/${productId}/positions`,
      {
        headers: {
          'x-api-key': env.PRODUCT_API_KEY,
        },
      },
    ).then((res) => res.json()),
  )

  const [errors, data] = resolveAllSettled(await Promise.allSettled(promises))

  if (errors.length)
    throw new Error(
      `Failed to fetch some or all product positions, Errors: ${JSON.stringify(
        errors,
      )}`,
    )

  const productPositions = ProductPositionsSchema.safeParse(data.flat())

  if (!productPositions.success)
    throw new Error(
      `Invalid request body: ${productPositions.error.toString()}`,
    )

  return productPositions.data
}
