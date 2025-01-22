export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/images'

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn('NEXT_PUBLIC_API_URL not found in environment variables, using default URL')
} 