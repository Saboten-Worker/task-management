"use client"

import { useState } from "react"
import { TaskTable } from "./tasks/task-table"
import { TaskFilters } from "./tasks/task-filters"
import { AddTaskButton } from "./tasks/add-task-button"

export function TaskList() {
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
      <TaskTable />
      <AddTaskButton onClick={handleAddTask} />
    </div>
  )
}
