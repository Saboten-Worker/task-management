"use client"

import { Badge } from "@/components/ui/badge"
import { useActiveTask } from "@/contexts/active-task-context"
import { priorityToJa, categoryToJa } from "./tasks/task-table"
import { TaskTimer } from "./tasks/task-timer"

export function ActiveTask() {
  const { activeTask } = useActiveTask()

  if (!activeTask) {
    return null
  }

  return (
    <div className="bg-muted py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{activeTask.title}</h2>
            <div className="space-x-2">
              <Badge
                variant={
                  activeTask.priority === "high" ? "destructive" : activeTask.priority === "medium" ? "default" : "secondary"
                }
              >
                {priorityToJa[activeTask.priority]}
              </Badge>
              <Badge variant="outline">{categoryToJa[activeTask.category]}</Badge>
            </div>
          </div>
          <TaskTimer />
        </div>
      </div>
    </div>
  )
}
