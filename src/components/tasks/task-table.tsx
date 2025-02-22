import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TaskRow } from "./task-row"
import { Suspense } from "react"

export interface Task {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'work' | 'personal'
  status: 'not_started' | 'in_progress' | 'suspended' | 'completed'
  total_time: number
  last_started_at: string
  owner_user_id: number
  created_at: string
  updated_at: string
}

// 優先度の日本語変換
export const priorityToJa = {
  high: '高',
  medium: '中',
  low: '低',
} as const;

// カテゴリーの日本語変換
export const categoryToJa = {
  work: '仕事',
  personal: '個人',
} as const;

// ステータスの日本語変換
export const statusToJa = {
  not_started: '未着手',
  in_progress: '進行中',
  suspended: '中断',
  completed: '完了',
} as const;

// 秒を時間形式（HH:MM:SS）に変換する関数
export function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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
