import { describe, it, expect } from 'vitest'
import { getSystemInfo } from '../../server/services/system-info.ts'

describe('system-info service', () => {
  it('returns valid CPU data', async () => {
    const info = await getSystemInfo()
    expect(info.cpu.cores).toBeGreaterThan(0)
    expect(info.cpu.usagePercent).toBeGreaterThanOrEqual(0)
    expect(info.cpu.usagePercent).toBeLessThanOrEqual(100)
    expect(info.cpu.model).toBeTruthy()
    expect(info.cpu.loadAvg).toHaveLength(3)
  })

  it('returns valid memory data', async () => {
    const info = await getSystemInfo()
    expect(info.memory.totalBytes).toBeGreaterThan(0)
    expect(info.memory.freeBytes).toBeGreaterThanOrEqual(0)
    expect(info.memory.usedBytes).toBeGreaterThan(0)
    expect(info.memory.usagePercent).toBeGreaterThan(0)
    expect(info.memory.usagePercent).toBeLessThanOrEqual(100)
  })

  it('returns valid disk data', async () => {
    const info = await getSystemInfo()
    expect(info.disk.usagePercent).toBeGreaterThanOrEqual(0)
    expect(info.disk.size).toBeTruthy()
  })

  it('returns hostname and platform', async () => {
    const info = await getSystemInfo()
    expect(info.hostname).toBeTruthy()
    expect(info.platform).toBeTruthy()
    expect(info.uptime).toBeGreaterThan(0)
  })
})
