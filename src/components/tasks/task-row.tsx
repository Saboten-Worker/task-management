"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useActiveTask } from "@/contexts/active-task-context"
import { startTask } from "@/app/actions/tasks/start"
import { suspendTask } from "@/app/actions/tasks/suspend"
import { completeTask } from "@/app/actions/tasks/complete"

import { Task, priorityToJa, categoryToJa, statusToJa, formatSeconds } from "./task-table"

interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
  const { setActiveTask, startTimer, stopTimer } = useActiveTask()

  const handleStartTask = async () => {
    try {
      const lastStartedAt = new Date().toISOString()
      const updatedTask = await startTask({ taskId: task.id, lastStartedAt })
      setActiveTask({ ...task, status: "in_progress" })
      startTimer()
    } catch (error) {
      console.error("Failed to start task:", error)
    }
  }

  const handleSuspendTask = async () => {
    try {
      const updatedTask = await suspendTask({ taskId: task.id })
      setActiveTask(null)
      stopTimer()
    } catch (error) {
      console.error("Failed to suspend task:", error)
    }
  }

  const handleCompleteTask = async () => {
    try {
      const updatedTask = await completeTask({ taskId: task.id })
      setActiveTask(null)
      stopTimer()
    } catch (error) {
      console.error("Failed to complete task:", error)
    }
  }

  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{task.title}</div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="link" size="sm" className="p-0">
                説明を表示
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            task.priority === "high" ? "destructive" :
            task.priority === "medium" ? "default" :
            "secondary"
          }
        >
          {priorityToJa[task.priority]}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{categoryToJa[task.category]}</Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            task.status === "not_started" ? "secondary" :
            task.status === "suspended" ? "secondary" :
            task.status === "in_progress" ? "warning" :
            task.status === "completed" ? "success" :
            "default"
          }
        >
          {statusToJa[task.status]}
        </Badge>
      </TableCell>
      <TableCell>{formatSeconds(task.total_time)}</TableCell>
      <TableCell>
        {task.status === "completed" ? "" : task.status === "in_progress" ? (
          <div className="flex gap-2">
            <Button 
              variant="warning"
              onClick={handleSuspendTask}
            >
              中断
            </Button>
            <Button 
              variant="success"
              onClick={handleCompleteTask}
            >
              完了
            </Button>
          </div>
        ) : (
          <Button 
            variant={
              task.status === "not_started" ? "secondary" :
              task.status === "suspended" ? "secondary" : 
              task.status === "completed" ? "success" :
              "default"
            }
            onClick={handleStartTask}
          >
            {task.status === "not_started" ? "開始" : "再開"}
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
