"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { AddTaskButton } from "./add-task-button"
import { createTask } from "@/app/actions/tasks/create"
import { toast } from "sonner"

export function AddTaskForm() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const priorities = [
    { value: "high", label: "高" },
    { value: "medium", label: "中" },
    { value: "low", label: "低" },
  ]

  const categories = [
    { value: "work", label: "仕事" },
    { value: "personal", label: "個人" },
    { value: "shopping", label: "買い物" },
    { value: "other", label: "その他" },
  ]

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    
    startTransition(async () => {
      const result = await createTask(new FormData(form))
      
      if (result.error) {
        toast.error(result.error)
        return
      }
      
      toast.success("タスクを作成しました")
      form.reset()
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddTaskButton onClick={() => setOpen(true)} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規タスクの追加</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              name="title"
              placeholder="タスクのタイトルを入力"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="タスクの説明を入力"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">優先度</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="優先度を選択" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">カテゴリ</Label>
            <Select name="category" defaultValue="work">
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "作成中..." : "登録"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
