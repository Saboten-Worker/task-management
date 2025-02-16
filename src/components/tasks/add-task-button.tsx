"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface AddTaskButtonProps {
  onClick: () => void
}

export function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <div className="mt-4 flex justify-center">
      <Button onClick={onClick} className="w-full sm:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" /> 新規タスクを追加
      </Button>
    </div>
  )
}
