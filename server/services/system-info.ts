import os from 'node:os'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export interface SystemInfo {
  cpu: {
    model: string
    cores: number
    loadAvg: number[]
    usagePercent: number
  }
  memory: {
    totalBytes: number
    freeBytes: number
    usedBytes: number
    usagePercent: number
  }
  disk: {
    filesystem: string
    size: string
    used: string
    available: string
    usagePercent: number
    mountpoint: string
  }
  uptime: number
  hostname: string
  platform: string
}

function getCpuUsage(): number {
  const cpus = os.cpus()
  let totalIdle = 0
  let totalTick = 0

  for (const cpu of cpus) {
    for (const type of Object.keys(cpu.times) as Array<keyof typeof cpu.times>) {
      totalTick += cpu.times[type]
    }
    totalIdle += cpu.times.idle
  }

  return Math.round((1 - totalIdle / totalTick) * 100)
}

async function getDiskUsage(): Promise<SystemInfo['disk']> {
  try {
    const { stdout } = await execAsync("df -h / | tail -1 | awk '{print $1,$2,$3,$4,$5,$6}'")
    const parts = stdout.trim().split(/\s+/)
    return {
      filesystem: parts[0] ?? '/',
      size: parts[1] ?? '0',
      used: parts[2] ?? '0',
      available: parts[3] ?? '0',
      usagePercent: parseInt(parts[4] ?? '0', 10) || 0,
      mountpoint: parts[5] ?? '/',
    }
  } catch {
    return {
      filesystem: '/',
      size: '0',
      used: '0',
      available: '0',
      usagePercent: 0,
      mountpoint: '/',
    }
  }
}

export async function getSystemInfo(): Promise<SystemInfo> {
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  const usedMem = totalMem - freeMem

  const disk = await getDiskUsage()
  const cpuModel = os.cpus()[0]?.model ?? 'Unknown'

  return {
    cpu: {
      model: cpuModel,
      cores: os.cpus().length,
      loadAvg: os.loadavg(),
      usagePercent: getCpuUsage(),
    },
    memory: {
      totalBytes: totalMem,
      freeBytes: freeMem,
      usedBytes: usedMem,
      usagePercent: Math.round((usedMem / totalMem) * 100),
    },
    disk,
    uptime: os.uptime(),
    hostname: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
  }
}
