import {
  type PickingOrder,
  type ProductPosition,
  type Vector3,
} from '~/picking-order/types'

export const calculateDistance = <V extends Vector3>(a: V, b: V): number =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)

export const solve = (
  startingPosition: Vector3,
  products: ProductPosition[],
): PickingOrder => {
  const unvisited = new Set(products.map(({ productId }) => productId))
  let productPositions = [...products]
  let lastVisitedPosition = startingPosition

  const result: PickingOrder = {
    pickingOrder: [],
    distance: 0,
  }

  while (unvisited.size > 0) {
    let shortestDistance = Infinity
    let nearestProductPosition = productPositions.at(0) as ProductPosition

    for (const position of productPositions) {
      if (position.quantity === 0) continue
      const distance = calculateDistance(lastVisitedPosition, position)
      if (distance < shortestDistance) {
        shortestDistance = distance
        nearestProductPosition = position
      }
    }

    result.distance += shortestDistance
    result.pickingOrder.push({
      productId: nearestProductPosition.productId,
      positionId: nearestProductPosition.positionId,
    })
    lastVisitedPosition = nearestProductPosition
    productPositions = productPositions.filter(
      (position) => position.productId !== nearestProductPosition.productId,
    )
    unvisited.delete(nearestProductPosition.productId)
  }

  return result
}
