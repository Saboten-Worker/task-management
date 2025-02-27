import { ActiveTask } from "@/components/active-task";
import { Header } from "@/components/header";
import { TaskList } from "@/components/task-list";
import { AddTaskForm } from "@/components/tasks/add-task-form";
import { Task } from "@/components/tasks/task-table";
import { api } from "@/lib/api";

async function fetchTasks(): Promise<Task[]> {
  try {
    return await api.get("/api/v1/tasks", {
      cache: 'no-store', // 常に最新のデータを取得
      next: { tags: ['tasks'] }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('タスクの取得に失敗しました');
  }
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
  );
}
