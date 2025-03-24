import { CalendarClock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { EmptyStateProps } from '@/types'

export function EmptyState({ onRestore }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-6 mb-4">
        <CalendarClock className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">No tasks scheduled</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        You don't have any tasks scheduled for today. Add new tasks or restore the default schedule.
      </p>
      <Button onClick={onRestore}>Restore Default Schedule</Button>
    </div>
  )
}
