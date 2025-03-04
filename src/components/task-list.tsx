"use client"

import { useActiveTask } from "@/contexts/active-task-context"
import { useEffect, useState } from "react"
import { TaskFilters } from "./tasks/task-filters"
import { TaskTable, type Task } from "./tasks/task-table"

/**
 * タスクをフィルタリングする
 * @param {Task[]} tasks - フィルタリング対象のタスク配列
 * @param {string} filter - フィルター条件 ("all" | "not-started" | "in-progress" | "completed" | "incomplete")
 * @returns {Task[]} フィルタリングされたタスク配列
 */
const filterTasks = (tasks: Task[], filter: string) => {
  if (filter === "all") return tasks
  
  const statusMap = {
    "not-started": "not_started",
    "in-progress": "in_progress",
    "completed": "completed",
    "incomplete": "incomplete"
  } as const;
  
  if (filter === "incomplete") {
    return tasks.filter(task => task.status !== "completed")
  }
  
  return tasks.filter(task => task.status === statusMap[filter as keyof typeof statusMap])
}

/**
 * タスクをソートする
 * @param {Task[]} tasks - ソート対象のタスク配列
 * @param {string} sort - ソート条件 ("priority" | "name" | "category")
 * @returns {Task[]} ソートされたタスク配列
 */
const sortTasks = (tasks: Task[], sort: string) => {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case "priority":
        const priorityMap = { "high": 3, "medium": 2, "low": 1 }
        const priorityDiff = (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0)
        return priorityDiff !== 0 ? priorityDiff : a.id - b.id
      case "name":
        const titleDiff = a.title.localeCompare(b.title)
        return titleDiff !== 0 ? titleDiff : a.id - b.id
      case "category":
        const categoryDiff = a.category.localeCompare(b.category)
        return categoryDiff !== 0 ? categoryDiff : a.id - b.id
      default:
        return a.id - b.id
    }
  })
}

/**
 * タスクリストのプロパティ
 */
interface TaskListProps {
  tasks: Task[]
}

/**
 * タスクリストコンポーネント
 * フィルタリング、ソート機能を備えたタスク一覧を表示する
 * 進行中のタスクを自動的にアクティブタスクとして設定する
 * @param {TaskListProps} props - タスクリストのプロパティ
 * @returns {JSX.Element} タスクリストコンポーネント
 */
export function TaskList(props: TaskListProps) {
  // デフォルトで未完了タスクを表示
  const [filter, setFilter] = useState("incomplete")
  const [sort, setSort] = useState("priority")
  const { activeTask, setActiveTask } = useActiveTask()

  // 初回レンダリング時と、タスクのステータスが変更されたときのみアクティブタスクを設定
  useEffect(() => {
    const inProgressTask = props.tasks.find(task => task.status === "in_progress")
    // アクティブタスクがない状態で進行中タスクが見つかった場合、
    // またはアクティブタスクのステータスが変更された場合のみ更新
    const shouldUpdateActiveTask = 
      (!activeTask && inProgressTask) || 
      (activeTask && props.tasks.find(task => task.id === activeTask.id)?.status !== activeTask.status);

    if (shouldUpdateActiveTask) {
      setActiveTask(inProgressTask || null);
    }
  }, [props.tasks, activeTask])

  return (
    <div>
      <TaskFilters
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />
      <TaskTable tasks={sortTasks(filterTasks(props.tasks, filter), sort)} />
    </div>
  )
}
