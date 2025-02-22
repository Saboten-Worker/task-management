"use client"

import { completeTask } from "@/app/actions/tasks/complete"
import { suspendTask } from "@/app/actions/tasks/suspend"
import { Button } from "@/components/ui/button"
import { useActiveTask } from "@/contexts/active-task-context"
import { formatSeconds } from "./task-table"

/**
 * タスクタイマーコンポーネント
 * アクティブなタスクの経過時間を表示し、タスクの中断や完了などのアクションを提供する。
 * useActiveTaskフックを使用してタスクの状態を管理し、1秒ごとに更新される経過時間を表示する。
 * 
 * @returns {JSX.Element | null} タイマーコンポーネント。アクティブタスクが存在しない場合はnullを返す
 */
export function TaskTimer() {
  const { activeTask, elapsedTime, setActiveTask } = useActiveTask()

  /**
   * タスクを中断する処理
   * タイマーを停止し、タスクのステータスを中断に更新する
   */
  const handleSuspend = async () => {
    if (activeTask) {
      suspendTask({ taskId: activeTask.id })
      setActiveTask(null)
    }
  }

  /**
   * タスクを完了する処理
   * タイマーを停止し、タスクのステータスを完了に更新する
   */
  const handleComplete = () => {
    if (activeTask) {
      completeTask({ taskId: activeTask.id })
      setActiveTask(null)
    }
  }

  return (
    <div className="text-center">
      <div className="text-3xl font-mono mb-2">{formatSeconds(elapsedTime)}</div>
      <div className="space-x-2">
        <Button variant="warning" onClick={handleSuspend} disabled={activeTask == null}>中断</Button>
        <Button variant="success" onClick={handleComplete} disabled={activeTask == null}>完了</Button>
      </div>
    </div>
  )
}
