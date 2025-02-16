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

// This is a placeholder for task data. In a real application, this would come from a database or API.
const tasks: Task[] = [
  {
    id: 1,
    name: "プロジェクト提案書の作成",
    description: "新規クライアント向けのプロジェクト提案書を作成し、レビューする。",
    priority: "高",
    category: "仕事",
    status: "進行中",
    totalTime: "02:30:00",
  },
  {
    id: 2,
    name: "食料品の買い出し",
    description: "今週の食料品（果物、野菜、牛乳など）を購入する。",
    priority: "中",
    category: "個人",
    status: "未着手",
    totalTime: "00:00:00",
  },
]

export function TaskTable() {
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
