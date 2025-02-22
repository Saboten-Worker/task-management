"use client"

import { Button } from "@/components/ui/button"
import { useActiveTask } from "@/contexts/active-task-context"
import { formatSeconds } from "./task-table"
import { suspendTask } from "@/app/actions/tasks/suspend"
import { completeTask } from "@/app/actions/tasks/complete"

export function TaskTimer() {
  const { activeTask, elapsedTime, setActiveTask, stopTimer } = useActiveTask()

  const handleSuspend = async () => {
    if (activeTask) {
      await suspendTask({ taskId: activeTask.id })
      stopTimer()
      const updatedTask = { ...activeTask, status: "not_started" as const }
      setActiveTask(updatedTask)
    }
  }

  const handleComplete = async () => {
    if (activeTask) {
      await completeTask({ taskId: activeTask.id })
      stopTimer()
      const updatedTask = { ...activeTask, status: "completed" as const }
      setActiveTask(updatedTask)
    }
  }

  return (
    <div className="text-center">
      <div className="text-3xl font-mono mb-2">{formatSeconds(elapsedTime)}</div>
      <div className="space-x-2">
        <Button variant="warning" onClick={handleSuspend}>中断</Button>
        <Button variant="success" onClick={handleComplete}>完了</Button>
      </div>
    </div>
  )
}
