import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TaskRow } from "./task-row"
import { Suspense } from "react"

/**
 * タスクの型定義
 * @interface Task
 * @property {number} id - タスクのID
 * @property {string} title - タスクのタイトル
 * @property {string} description - タスクの説明
 * @property {'high' | 'medium' | 'low'} priority - 優先度
 * @property {'work' | 'personal'} category - カテゴリー
 * @property {'not_started' | 'in_progress' | 'suspended' | 'completed'} status - タスクの状態
 * @property {number} total_time - 合計作業時間（秒）
 * @property {string} last_started_at - 最後に開始した時刻
 * @property {number} owner_user_id - タスクの所有者ID
 * @property {string} created_at - 作成日時
 * @property {string} updated_at - 更新日時
 */
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

/**
 * 優先度の日本語表記マッピング
 */
export const priorityToJa = {
  high: '高',
  medium: '中',
  low: '低',
} as const;

/**
 * カテゴリーの日本語表記マッピング
 */
export const categoryToJa = {
  work: '仕事',
  personal: '個人',
} as const;

/**
 * ステータスの日本語表記マッピング
 */
export const statusToJa = {
  not_started: '未着手',
  in_progress: '進行中',
  suspended: '中断',
  completed: '完了',
} as const;

/**
 * 秒を時間形式（HH:MM:SS）に変換する
 * @param {number} seconds - 変換する秒数
 * @returns {string} 時間形式の文字列（例："01:30:45"）
 */
export function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

/**
 * タスクテーブルのプロパティ
 */
interface TaskTableProps {
  tasks: Task[]
}

/**
 * タスク一覧を表示するテーブルコンポーネント
 * @param {TaskTableProps} props - テーブルのプロパティ
 * @returns {JSX.Element} タスク一覧テーブル
 */
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
