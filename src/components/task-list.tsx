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
    name: "Complete project proposal",
    description: "Write and review the project proposal for the new client.",
    priority: "High",
    category: "Work",
    status: "In Progress",
    totalTime: "02:30:00",
  },
  {
    id: 2,
    name: "Go grocery shopping",
    description: "Buy groceries for the week, including fruits, vegetables, and milk.",
    priority: "Medium",
    category: "Personal",
    status: "Not Started",
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
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Time</TableHead>
            <TableHead>Action</TableHead>
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
                        Show description
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
                    task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
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
                    task.status === "Completed" ? "success" : task.status === "In Progress" ? "warning" : "default"
                  }
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>{task.totalTime}</TableCell>
              <TableCell>
                <Button variant={task.status === "Not Started" ? "default" : "secondary"}>
                  {task.status === "Not Started" ? "Start" : task.status === "In Progress" ? "Pause" : "Restart"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        <Button onClick={handleAddTask} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </div>
    </div>
  )
}

