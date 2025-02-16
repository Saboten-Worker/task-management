import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TaskRow } from "./task-row"

export interface Task {
  id: number
  name: string
  description: string
  priority: string
  category: string
  status: string
  totalTime: string
}

interface TaskTableProps {
  tasks: Task[]
}

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>タスク</TableHead>
          <TableHead>優先度</TableHead>
          <TableHead>カテゴリー</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>合計時間</TableHead>
          <TableHead>アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  )
}
