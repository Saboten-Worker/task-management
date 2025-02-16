import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ActiveTask() {
  // This is a placeholder for the active task. In a real application, this would be dynamically rendered based on the current active task.
  const activeTask = {
    name: "プロジェクト提案書の作成",
    priority: "高",
    category: "仕事",
    elapsedTime: "00:45:30",
  }

  if (!activeTask) return null

  return (
    <div className="bg-muted py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{activeTask.name}</h2>
            <div className="space-x-2">
              <Badge variant="destructive">{activeTask.priority}</Badge>
              <Badge variant="secondary">{activeTask.category}</Badge>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono mb-2">{activeTask.elapsedTime}</div>
            <div className="space-x-2">
              <Button variant="warning">一時停止</Button>
              <Button variant="success">完了</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
