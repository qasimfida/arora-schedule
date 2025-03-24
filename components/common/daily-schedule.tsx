"use client"

import { useState } from "react"
import { Task } from "@/components/common/task"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/common/empty-state"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RefreshCw, MoreVertical, Calendar, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { TaskType } from "@/types"

const initialTasks: TaskType[] = [
  {
    id: 1,
    title: "Morning Workout",
    time: "06:00 - 07:00",
    description: "30 minutes cardio and 15 minutes stretching",
    status: "pending",
  },
  {
    id: 2,
    title: "Team Meeting",
    time: "09:30 - 10:30",
    description: "Weekly progress update with the development team",
    status: "pending",
  },
  {
    id: 3,
    title: "Lunch Break",
    time: "12:00 - 13:00",
    description: "Meal prep: Chicken salad with avocado",
    status: "pending",
  },
  {
    id: 4,
    title: "Project Planning",
    time: "14:00 - 15:30",
    description: "Finalize Q3 roadmap and resource allocation",
    status: "pending",
  },
  {
    id: 5,
    title: "Evening Reading",
    time: "20:00 - 21:00",
    description: "Continue reading 'Atomic Habits' by James Clear",
    status: "pending",
  },
]

export function DailySchedule() {
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks)

  const formatDate = () => {
    const date = new Date()
    const day = date.toLocaleDateString("en-US", { weekday: "short" })
    const dayNum = date.getDate().toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day} ${dayNum}, ${year}`
  }

  const updateTaskStatus = (id: number, status: "completed" | "skipped" | "pending") => {
    const task = tasks.find((t) => t.id === id)

    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))

    if (status !== "pending") {
      toast[status === "completed" ? "success" : "warning"](
        `Task ${status === "completed" ? "completed" : "skipped"}: ${task?.title}`,
        {
          action: {
            label: "Undo",
            onClick: () => updateTaskStatus(id, "pending"),
          },
          duration: 4000,
        },
      )
    }
  }

  const resetTasks = () => {
    setTasks(tasks.map((task) => ({ ...task, status: "pending" })))
    toast.info("All tasks have been reset")
  }

  const clearTasks = () => {
    setTasks([])
    toast.info("Schedule cleared", {
      action: {
        label: "Undo",
        onClick: () => {
          setTasks(initialTasks.map((task) => ({ ...task, status: "pending" })))
          toast.success("Default schedule restored")
        },
      },
    })
  }

  const restoreDefaultSchedule = () => {
    setTasks(initialTasks.map((task) => ({ ...task, status: "pending" })))
    toast.success("Default schedule restored")
  }

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const skippedTasks = tasks.filter((task) => task.status === "skipped").length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Daily Schedule
          <span className="block text-lg font-normal text-muted-foreground mt-1">{formatDate()}</span>
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={restoreDefaultSchedule}>
              <Calendar className="h-4 w-4 mr-2" />
              Today&apos;s Schedule
            </DropdownMenuItem>
            <DropdownMenuItem onClick={clearTasks}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Schedule
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {tasks.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Today&apos;s Progress</h2>
              <p className="text-muted-foreground">
                {completedTasks} completed, {skippedTasks} skipped, {totalTasks - completedTasks - skippedTasks} pending
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={resetTasks}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="w-full h-2 bg-muted rounded-full mb-8">
            <div className="h-full bg-primary rounded-full" style={{ width: `${progressPercentage}%` }} />
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onComplete={() => updateTaskStatus(task.id, "completed")}
                onSkip={() => updateTaskStatus(task.id, "skipped")}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState onRestore={restoreDefaultSchedule} />
      )}
    </div>
  )
}

