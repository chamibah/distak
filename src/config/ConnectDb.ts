import { createClient } from 'redis'

export const redis = createClient()
redis.on('error', (error) => console.error("string",error))
redis.connect()
