"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Task } from "@/components/tasks/task-table"

interface ActiveTaskContextType {
  activeTask: Task | null
  elapsedTime: number
  setActiveTask: (task: Task | null) => void
  startTimer: () => void
  stopTimer: () => void
}

const ActiveTaskContext = createContext<ActiveTaskContextType | undefined>(undefined)

export function ActiveTaskProvider({ children }: { children: React.ReactNode }) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRunning && activeTask) {
      intervalId = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, activeTask])

  const startTimer = () => {
    setIsRunning(true)
  }

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

export function useActiveTask() {
  const context = useContext(ActiveTaskContext)
  if (context === undefined) {
    throw new Error("useActiveTask must be used within a ActiveTaskProvider")
  }
  return context
}
