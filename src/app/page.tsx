import { Header } from "@/components/header"
import { ActiveTask } from "@/components/active-task"
import { TaskList } from "@/components/task-list"
import { Task } from "@/components/tasks/task-table"

export default function TaskManager() {
  // TODO ダミーデータ、後でAPIから取得するように変更する
  const tasks: Task[] = [
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
  ]
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <ActiveTask />
      <main className="flex-1 container mx-auto px-4 py-8">
        <TaskList tasks={tasks} />
      </main>
    </div>
  )
}

