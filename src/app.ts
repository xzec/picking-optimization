import express from 'express'
import cors from 'cors'
import { PICKING_ORDER_ROUTE } from '~/constants'
import { notFoundMiddleware } from '~/middlewares'
import { pickingOrderHandler } from '~/picking-order'

const app = express()

app.use(express.json())
app.use(cors())

app.post(PICKING_ORDER_ROUTE, pickingOrderHandler)

app.use(notFoundMiddleware)

export default app
