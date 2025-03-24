"use client"

import { CheckCircle, Clock, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type TaskProps = {
  task: {
    id: number
    title: string
    time: string
    description: string
    status: "pending" | "completed" | "skipped"
  }
  onComplete: () => void
  onSkip: () => void
}

export function Task({ task, onComplete, onSkip }: TaskProps) {
  return (
    <Card
      className={cn(
        "transition-all",
        task.status === "completed" && "border-green-500 bg-green-50 dark:bg-green-950/20",
        task.status === "skipped" && "border-amber-500 bg-amber-50 dark:bg-amber-950/20",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{task.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="h-3 w-3 mr-1" />
              {task.time}
            </div>
          </div>
          {task.status === "completed" && (
            <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </span>
          )}
          {task.status === "skipped" && (
            <span className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
              <SkipForward className="h-4 w-4 mr-1" />
              Skipped
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
      {task.status === "pending" && (
        <CardFooter className="pt-0 gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onSkip}>
            Skip
          </Button>
          <Button size="sm" onClick={onComplete}>
            Complete
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}