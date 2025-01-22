# API Endpoints

## Base URL

```
https://http://localhost:3001
```


## Rate Limits

- 100 requests per 15 minutes per IP address
- Excess requests will receive a 429 Too Many Requests response

## Endpoints

### Image Analysis

#### POST /api/images/analyze

Analyzes an uploaded meme image and generates a character profile.

**Request Body:**
```json
{
  "image": "base64_encoded_image_string",
  "memeName": "string"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "name": "string",
    "appearanceTraits": ["string"],
    "possibleJokes": ["string"],
    "personality": "string"
  }
}
```

### Character Chat

#### POST /api/images/chat

Enables conversation with a meme character.

**Request Body:**
```json
{
  "message": "string",
  "description": "string",
  "memeName": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "string"
}
```

### Blockchain Integration (Coming Soon)

#### GET /api/bitquery/token/:address

Retrieves token information from the blockchain.

**Parameters:**
- `address`: Token contract address

**Response:**
```json
{
  "marketcap": "string",
  "symbol": "string",
  "mintAddress": "string",
  "features": [
    "Token Market Cap",
    "Top Holders",
    "Trading Volume",
    "Price History"
  ]
}
```

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "string",
  "message": "string"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 429: Too Many Requests
- 500: Internal Server Error

For detailed examples and use cases, refer to our [Overview](../overview.md). 