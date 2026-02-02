import { describe, it, expect } from 'vitest'
import { scanMemory } from '../../server/services/memory-scanner.ts'

describe('memory-scanner service', () => {
  it('returns memory stats object', async () => {
    const stats = await scanMemory()
    expect(stats).toHaveProperty('fileCount')
    expect(stats).toHaveProperty('totalSizeBytes')
    expect(stats).toHaveProperty('lastUpdate')
    expect(stats).toHaveProperty('files')
    expect(Array.isArray(stats.files)).toBe(true)
  })

  it('returns non-negative file count', async () => {
    const stats = await scanMemory()
    expect(stats.fileCount).toBeGreaterThanOrEqual(0)
    expect(stats.totalSizeBytes).toBeGreaterThanOrEqual(0)
  })

  it('returns files with correct shape', async () => {
    const stats = await scanMemory()
    if (stats.files.length > 0) {
      const file = stats.files[0]
      expect(file).toHaveProperty('name')
      expect(file).toHaveProperty('size')
      expect(file).toHaveProperty('modified')
      expect(typeof file.name).toBe('string')
      expect(typeof file.size).toBe('number')
    }
  })

  it('sorts files by modified date descending', async () => {
    const stats = await scanMemory()
    if (stats.files.length > 1) {
      const dates = stats.files.map(f => new Date(f.modified).getTime())
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1])
      }
    }
  })
})
