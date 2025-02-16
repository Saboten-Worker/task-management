"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PlusCircle } from "lucide-react"

// This is a placeholder for task data. In a real application, this would come from a database or API.
const tasks = [
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
  // Add more tasks as needed
]

export function TaskList() {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("priority")

  const handleAddTask = () => {
    // This function would open a modal or navigate to a new task form
    console.log("Add new task")
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ステータスで絞り込む" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="not-started">未着手</SelectItem>
            <SelectItem value="in-progress">進行中</SelectItem>
            <SelectItem value="completed">完了</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="並び替え" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">優先度</SelectItem>
            <SelectItem value="name">タスク名</SelectItem>
            <SelectItem value="category">カテゴリー</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            <TableRow key={task.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{task.name}</div>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="link" size="sm" className="p-0">
                        説明を表示
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.priority === "高" ? "destructive" : task.priority === "中" ? "default" : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{task.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    task.status === "完了" ? "success" : task.status === "進行中" ? "warning" : "default"
                  }
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>{task.totalTime}</TableCell>
              <TableCell>
                <Button variant={task.status === "未着手" ? "default" : "secondary"}>
                  {task.status === "未着手" ? "開始" : task.status === "進行中" ? "中断" : "再開"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        <Button onClick={handleAddTask} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> 新規タスクを追加
        </Button>
      </div>
    </div>
  )
}
