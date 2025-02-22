"use client"

import { useEffect, useState } from "react"
import { useActiveTask } from "@/contexts/active-task-context"
import { TaskTable, type Task } from "./tasks/task-table"

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

const sortTasks = (tasks: Task[], sort: string) => {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case "priority":
        const priorityMap = { "high": 3, "medium": 2, "low": 1 }
        return (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0)
      case "name":
        return a.title.localeCompare(b.title)
      case "category":
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })
}

import { TaskFilters } from "./tasks/task-filters"

export function TaskList(props: { tasks: Task[] }) {
  const [filter, setFilter] = useState("incomplete")
  const [sort, setSort] = useState("priority")
  const { setActiveTask, startTimer } = useActiveTask()

  useEffect(() => {
    const inProgressTask = props.tasks.find(task => task.status === "in_progress")
    setActiveTask(inProgressTask || null)
    if (inProgressTask) {
      startTimer()
    }
  }, [props.tasks, setActiveTask])

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
