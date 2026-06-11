interface CacheEntry {
  isAuth: boolean
  timestamp: number
}

class AuthCache {
  private cache = new Map<string, CacheEntry>()
  private readonly TTL: number
  private readonly MAX_SIZE: number
  private cleanupIntervalId?: NodeJS.Timeout

  constructor() {
    this.TTL = 60 * 1000
    this.MAX_SIZE = 100
  }

  get(key: string): boolean | null {
    const entry = this.findEntry(key)

    if (!entry) {
      return null
    }

    if (this.isExpired(entry)) {
      this.delete(key)
      return null
    }

    return entry.isAuth
  }

  set(key: string, isAuth: boolean): void {
    this.ensureCacheSize()
    this.addEntry(key, isAuth)
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  startAutoCleanup(intervalMs: number = 60 * 60 * 1000): void {
    if (this.cleanupIntervalId) {
      return
    }

    this.cleanupIntervalId = setInterval(() => {
      this.cleanup()
    }, intervalMs)
  }

  private findEntry(key: string): CacheEntry | undefined {
    return this.cache.get(key)
  }

  private isExpired(entry: CacheEntry): boolean {
    const age = Date.now() - entry.timestamp
    return age > this.TTL
  }

  private addEntry(key: string, isAuth: boolean): void {
    this.cache.set(key, {
      isAuth,
      timestamp: Date.now(),
    })
  }

  private ensureCacheSize(): void {
    if (this.cache.size >= this.MAX_SIZE) {
      this.removeOldestEntry()
    }
  }

  private removeOldestEntry(): void {
    const firstKey = this.cache.keys().next().value

    if (firstKey) {
      this.cache.delete(firstKey)
    }
  }

  private cleanup(): void {
    const expiredKeys = this.findExpiredKeys()
    this.removeExpiredKeys(expiredKeys)
  }

  private findExpiredKeys(): string[] {
    const now = Date.now()
    const expiredKeys: string[] = []

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.TTL) {
        expiredKeys.push(key)
      }
    }

    return expiredKeys
  }

  private removeExpiredKeys(keys: string[]): void {
    keys.forEach(key => this.cache.delete(key))
  }
}

export const authCache = new AuthCache()

authCache.startAutoCleanup(60 * 60 * 1000)
