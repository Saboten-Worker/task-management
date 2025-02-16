"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Task {
  id: number
  name: string
  description: string
  priority: string
  category: string
  status: string
  totalTime: string
}

interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{task.name}</div>
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
            task.priority === "高" ? "destructive" : task.priority === "中" ? "default" : "secondary"
          }
        >
          {task.priority}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{task.category}</Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            task.status === "完了" ? "success" : task.status === "進行中" ? "warning" : "default"
          }
        >
          {task.status}
        </Badge>
      </TableCell>
      <TableCell>{task.totalTime}</TableCell>
      <TableCell>
        <Button variant={task.status === "未着手" ? "default" : "secondary"}>
          {task.status === "未着手" ? "開始" : task.status === "進行中" ? "一時停止" : "再開"}
        </Button>
      </TableCell>
    </TableRow>
  )
}
