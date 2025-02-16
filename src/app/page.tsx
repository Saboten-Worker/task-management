import { Header } from "@/components/header"
import { ActiveTask } from "@/components/active-task"
import { TaskList } from "@/components/task-list"

export default function TaskManager() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <ActiveTask />
      <main className="flex-1 container mx-auto px-4 py-8">
        <TaskList />
      </main>
    </div>
  )
}

