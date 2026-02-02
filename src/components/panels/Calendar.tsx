import { LcarsPanel } from '../lcars/LcarsPanel'

interface CalendarEvent {
  title: string
  date: string
  time: string | null
  source: string
}

interface CalendarData {
  events: CalendarEvent[]
}

export function Calendar({ data }: { data?: CalendarData }) {
  const events = data?.events ?? []

  return (
    <LcarsPanel title="Calendar" color="bg-lcars-blue">
      <div className="space-y-2">
        {events.length === 0 ? (
          <div className="text-xs text-lcars-muted py-2">No events</div>
        ) : (
          events.map((event, i) => (
            <div key={`${event.date}-${i}`} className="flex items-start gap-3 py-1.5 border-b border-lcars-dark-2/50 last:border-0">
              <div className="flex-shrink-0 w-10 text-center">
                <div className="text-sm font-bold font-lcars-data text-lcars-blue">
                  {new Date(event.date + 'T00:00:00').toLocaleDateString('de-DE', { day: '2-digit' })}
                </div>
                <div className="text-[9px] uppercase text-lcars-muted">
                  {new Date(event.date + 'T00:00:00').toLocaleDateString('de-DE', { month: 'short' })}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-lcars-text truncate">{event.title}</div>
                {event.time && (
                  <div className="text-[10px] text-lcars-muted font-lcars-data">{event.time}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </LcarsPanel>
  )
}
