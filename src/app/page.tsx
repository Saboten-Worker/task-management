import { ActiveTask } from "@/components/active-task"
import { Header } from "@/components/header"
import { TaskList } from "@/components/task-list"
import { AddTaskForm } from "@/components/tasks/add-task-form"
import { Task } from "@/components/tasks/task-table"

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/tasks`, {
    cache: 'no-store', // 常に最新のデータを取得
    next: { tags: ['tasks'] }
  });
  
  if (!response.ok) {
    throw new Error('タスクの取得に失敗しました');
  }

  const json = await response.json();
  console.log(json);
  return json;
}

export default async function TaskManager() {
  const tasks = await fetchTasks();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <ActiveTask />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AddTaskForm />
        <TaskList tasks={tasks} />
      </main>
    </div>
  )
}
