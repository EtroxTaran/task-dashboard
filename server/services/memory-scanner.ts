import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

const MEMORY_DIR = path.join(os.homedir(), '.openclaw', 'workspace', 'memory')

export interface MemoryFile {
  name: string
  size: number
  modified: string
}

export interface MemoryStats {
  fileCount: number
  totalSizeBytes: number
  lastUpdate: string | null
  files: MemoryFile[]
}

export async function scanMemory(): Promise<MemoryStats> {
  try {
    const entries = await fs.readdir(MEMORY_DIR)
    const files: MemoryFile[] = []
    let totalSize = 0
    let latestMtime = 0

    for (const entry of entries) {
      try {
        const filePath = path.join(MEMORY_DIR, entry)
        const stat = await fs.stat(filePath)
        if (stat.isFile()) {
          files.push({
            name: entry,
            size: stat.size,
            modified: stat.mtime.toISOString(),
          })
          totalSize += stat.size
          if (stat.mtimeMs > latestMtime) {
            latestMtime = stat.mtimeMs
          }
        }
      } catch {
        // Skip files we can't stat
      }
    }

    files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())

    return {
      fileCount: files.length,
      totalSizeBytes: totalSize,
      lastUpdate: latestMtime > 0 ? new Date(latestMtime).toISOString() : null,
      files,
    }
  } catch {
    return {
      fileCount: 0,
      totalSizeBytes: 0,
      lastUpdate: null,
      files: [],
    }
  }
}
