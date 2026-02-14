import Redis from 'ioredis'

declare global {
  var redis: Redis | undefined
}

let redis: Redis

if (process.env.NODE_ENV === 'production') {
  redis = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false
  })
} else {
  if (!global.redis) {
    global.redis = new Redis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false
    })
  }
  redis = global.redis
}

redis.on('error', (error) => {
  console.error('Redis 연결 오류:', error)
})

redis.on('connect', () => {
  console.log('Redis에 연결되었습니다')
})

redis.on('ready', () => {
  console.log('Redis 준비 완료')
})

export default redis
