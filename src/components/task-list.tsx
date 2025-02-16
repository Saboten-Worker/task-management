"use client"

import { useState } from "react"
import { TaskTable, type Task } from "./tasks/task-table"

const filterTasks = (tasks: Task[], filter: string) => {
  if (filter === "all") return tasks
  const statusMap = {
    "not-started": "未着手",
    "in-progress": "進行中",
    "completed": "完了",
    "incomplete": "未完了"
  }
  
  if (filter === "incomplete") {
    return tasks.filter(task => task.status !== statusMap["completed"])
  }
  
  return tasks.filter(task => task.status === statusMap[filter as keyof typeof statusMap])
}

const sortTasks = (tasks: Task[], sort: string) => {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case "priority":
        const priorityMap = { "高": 3, "中": 2, "低": 1 }
        return (priorityMap[b.priority as keyof typeof priorityMap] || 0) - 
               (priorityMap[a.priority as keyof typeof priorityMap] || 0)
      case "name":
        return a.name.localeCompare(b.name)
      case "category":
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })
}
import { TaskFilters } from "./tasks/task-filters"
import { AddTaskButton } from "./tasks/add-task-button"

export function TaskList(props: { tasks: Task[] }) {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("priority")

  const handleAddTask = () => {
    // This function would open a modal or navigate to a new task form
    console.log("Add new task")
  }

  return (
    <div>
      <TaskFilters
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />
      <TaskTable tasks={sortTasks(filterTasks(props.tasks, filter), sort)} />
      <AddTaskButton onClick={handleAddTask} />
    </div>
  )
}
