"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Task } from "@/components/tasks/task-table"

/**
 * アクティブタスクのコンテキストの型定義
 */
interface ActiveTaskContextType {
  activeTask: Task | null      // 現在進行中のタスク
  elapsedTime: number         // 経過時間（秒）
  setActiveTask: (task: Task | null) => void  // タスクの設定
  startTimer: () => void      // タイマー開始
  stopTimer: () => void       // タイマー停止
}

// アクティブタスクのコンテキストを作成
const ActiveTaskContext = createContext<ActiveTaskContextType | undefined>(undefined)

/**
 * アクティブタスクの状態を管理し、子コンポーネントに提供するプロバイダーコンポーネント
 */
export function ActiveTaskProvider({ children }: { children: React.ReactNode }) {
  // 内部状態の管理
  const [activeTask, _setActiveTask] = useState<Task | null>(null)  // 進行中のタスク
  const [elapsedTime, setElapsedTime] = useState(0)                // 経過時間
  const [isRunning, setIsRunning] = useState(false)                // タイマーの実行状態

  // タイマーの制御
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    // タイマーが実行中かつタスクが存在し、タスクのステータスが進行中の場合のみタイマーを更新
    if (isRunning && activeTask && activeTask.status === "in_progress") {
      intervalId = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    // クリーンアップ関数：コンポーネントのアンマウント時やタイマー停止時にインターバルをクリア
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, activeTask])

  /**
   * アクティブタスクを設定する関数
   * タスクが設定される際は、そのタスクの累計作業時間を初期値として設定
   * タスクがクリアされる際は、経過時間も0にリセットしタイマーを停止
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

  // タイマーを開始する関数
  const startTimer = () => {
    if (activeTask) {
      setIsRunning(true)
    }
  }

  // タイマーを停止する関数
  const stopTimer = () => {
    setIsRunning(false)
  }

  return (
    <ActiveTaskContext.Provider
      value={{
        activeTask,
        elapsedTime,
        setActiveTask,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </ActiveTaskContext.Provider>
  )
}

/**
 * アクティブタスクのコンテキストを使用するためのカスタムフック
 * ActiveTaskProviderの子コンポーネント内でのみ使用可能
 */
export function useActiveTask() {
  const context = useContext(ActiveTaskContext)
  if (context === undefined) {
    throw new Error("useActiveTask must be used within a ActiveTaskProvider")
  }
  return context
}
