import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useActiveTask } from "@/contexts/active-task-context"
import { priorityToJa, categoryToJa, formatSeconds } from "./tasks/task-table"

export function ActiveTask() {
  const { activeTask, elapsedTime, stopTimer } = useActiveTask()

  if (!activeTask) return null

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
          <div className="text-center">
            <div className="text-3xl font-mono mb-2">{formatSeconds(elapsedTime)}</div>
            <div className="space-x-2">
              <Button variant="warning" onClick={stopTimer}>中断</Button>
              <Button variant="success">完了</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
