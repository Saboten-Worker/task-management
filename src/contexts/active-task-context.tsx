"use client"

import { Task } from "@/components/tasks/task-table"
import { createContext, useContext, useEffect, useState } from "react"

/**
 * アクティブタスクのコンテキストの型定義
 * @interface ActiveTaskContextType
 * @property {Task | null} activeTask - 現在アクティブなタスク
 * @property {number} elapsedTime - 経過時間（秒）
 * @property {(task: Task | null) => void} setActiveTask - アクティブタスクを設定する関数
 */
interface ActiveTaskContextType {
  activeTask: Task | null
  elapsedTime: number
  setActiveTask: (task: Task | null) => void
}

// アクティブタスクのコンテキストを作成
const ActiveTaskContext = createContext<ActiveTaskContextType | undefined>(undefined)

/**
 * アクティブタスクのプロバイダーコンポーネント
 * タスクの状態管理とタイマー機能を提供する
 * @param {{ children: React.ReactNode }} props - 子コンポーネント
 * @returns {JSX.Element} プロバイダーコンポーネント
 */
export function ActiveTaskProvider({ children }: { children: React.ReactNode }) {
  const [activeTask, _setActiveTask] = useState<Task | null>(null)  // 進行中のタスク
  const [elapsedTime, setElapsedTime] = useState(0)                // 経過時間
  const [isRunning, setIsRunning] = useState(false)                // タイマーの実行状態

  /**
   * タイマーの制御
   * タイマーが実行中かつタスクが進行中の場合、1秒ごとに経過時間を更新
   */
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRunning && activeTask?.status === "in_progress") {
      intervalId = setInterval(() => {
        setElapsedTime(prev => { console.log(prev); return prev + 1; })
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, activeTask])

  /**
   * アクティブタスクを設定する関数
   * @param {Task | null} task - 設定するタスク
   */
  const setActiveTask = (task: Task | null) => {
    if (task) {
      setElapsedTime(task.total_time)  // タスクの累計時間を初期値として設定
      if (task.status === "in_progress") {
        setIsRunning(true)  // 進行中のタスクの場合、タイマーを自動的に開始
      }
    } else {
      setElapsedTime(0)     // タスクがない場合は経過時間をリセット
      setIsRunning(false)   // タイマーを停止
    }
    _setActiveTask(task)
  }

  return (
    <ActiveTaskContext.Provider
      value={{
        activeTask,
        elapsedTime,
        setActiveTask,
      }}
    >
      {children}
    </ActiveTaskContext.Provider>
  )
}

/**
 * アクティブタスクのコンテキストを使用するためのカスタムフック
 * @returns {ActiveTaskContextType} アクティブタスクのコンテキスト
 * @throws {Error} ActiveTaskProviderの外部で使用された場合
 */
export function useActiveTask() {
  const context = useContext(ActiveTaskContext)
  if (context === undefined) {
    throw new Error("useActiveTask must be used within a ActiveTaskProvider")
  }
  return context
}
