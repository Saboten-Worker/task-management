"use client"

import { startTask } from "@/app/actions/tasks/start"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { TableCell, TableRow } from "@/components/ui/table"
import { useActiveTask } from "@/contexts/active-task-context"
import { Task, categoryToJa, formatSeconds, priorityToJa, statusToJa } from "./task-table"

/**
 * タスク行のプロパティ
 * @interface TaskRowProps
 * @property {Task} task - 表示するタスク
 */
interface TaskRowProps {
  task: Task
}

/**
 * タスク行コンポーネント
 * タスクの詳細情報を表示し、タスクの開始・停止などのアクションを提供する
 * @param {TaskRowProps} props - タスク行のプロパティ
 * @returns {JSX.Element} タスク行の要素
 */
export function TaskRow({ task }: TaskRowProps) {
  const { setActiveTask, startTimer } = useActiveTask()

  /**
   * タスクを開始する
   * APIを呼び出してタスクを開始し、アクティブタスクとして設定する
   */
  const handleStartTask = async () => {
    try {
      const lastStartedAt = new Date().toISOString()
      const updatedTask = await startTask({ taskId: task.id, lastStartedAt })
      setActiveTask({ ...updatedTask, status: "in_progress" as const })
      startTimer()
    } catch (error) {
      console.error("Failed to start task:", error)
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
            task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
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
            task.status === "completed" ? "success" : task.status === "in_progress" ? "warning" : "default"
          }
        >
          {statusToJa[task.status]}
        </Badge>
      </TableCell>
      <TableCell>{formatSeconds(task.total_time)}</TableCell>
      <TableCell>
        <Button 
          variant={task.status === "not_started" ? "default" : "secondary"}
          onClick={handleStartTask}
          disabled={task.status === "in_progress"}
        >
          {task.status === "not_started" ? "開始" : "再開"}
        </Button>
      </TableCell>
    </TableRow>
  )
}
