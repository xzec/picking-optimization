# Picking optimization

A simple Express server that calculates picking route.

## Prerequisites

- See `"engines"` in [package.json](package.json)

## Getting started

- `pnpm i`
- `pnpm dev` or `pnpm build && pnpm start`

## Usage

### `POST` /api/picking-order

Calculates picking route.

- Method: `POST`
- Endpoint: `/api/picking-order`
- Headers:
  - `Content-Type: application/json`
- Request Body:
  ```json
  {
    "products": ["string"],
    "startingPosition": {
      "x": "number",
      "y": "number",
      "z": "number"
    }
  }
  ```
  
### Success Response
  - Code: `200`
  - Content:
  ```json
  {
    "pickingOrder": [
      {
        "productId": "string",
        "positionId": "string"
      }
    ],
    "distance": "number"
  }
  ```

### Error Response
  - Code: `400` Bad Request

### Example call
  ```bash
  curl -X POST http://localhost:3000/api/picking-order \
       -H "Content-Type: application/json" \
       -d '{
              "products": [
                  "product-1",
                  "product-2"
              ],
              "startingPosition": {
                  "x": 0,
                  "y": 0,
                  "z": 0
              }
           }'
  ```

#### Response
  ```json
  {
      "pickingOrder": [
          {
              "productId": "product-1",
              "positionId": "position-31"
          },
          {
              "productId": "product-2",
              "positionId": "position-241"
          }
      ],
      "distance": 14.16227766016838
  }
  ```
