"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { Task, priorityToJa, categoryToJa, statusToJa, formatSeconds } from "./task-table"

interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
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
        <Button variant={task.status === "not_started" ? "default" : "secondary"}>
          {task.status === "not_started" ? "開始" : task.status === "in_progress" ? "中断" : "再開"}
        </Button>
      </TableCell>
    </TableRow>
  )
}
