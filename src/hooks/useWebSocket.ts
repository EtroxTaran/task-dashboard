import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface DashboardData {
  system: unknown
  agent: unknown
  tasks: unknown
  memory: unknown
  calendar: unknown
  timestamp: string
}

export function useWebSocket() {
  const queryClient = useQueryClient()
  const wsRef = useRef<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    let disposed = false

    function connect() {
      if (disposed) return

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const wsUrl = `${protocol}//${window.location.host}/ws`
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        if (!disposed) setConnected(true)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as DashboardData
          if (data.system) queryClient.setQueryData(['system'], data.system)
          if (data.agent) queryClient.setQueryData(['agent-status'], data.agent)
          if (data.tasks) queryClient.setQueryData(['tasks'], data.tasks)
          if (data.memory) queryClient.setQueryData(['memory'], data.memory)
          if (data.calendar) queryClient.setQueryData(['calendar'], data.calendar)
        } catch {
          // Ignore parse errors
        }
      }

      ws.onclose = () => {
        if (!disposed) {
          setConnected(false)
          wsRef.current = null
          reconnectTimerRef.current = setTimeout(connect, 3000)
        }
      }

      ws.onerror = () => {
        ws.close()
      }

      wsRef.current = ws
    }

    connect()

    return () => {
      disposed = true
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
      if (wsRef.current) {
        wsRef.current.onclose = null
        wsRef.current.close()
      }
    }
  }, [queryClient])

  return { connected }
}
