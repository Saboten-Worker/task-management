"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.name}</CardTitle>
              <div className="flex space-x-2 mt-2">
                <Badge
                  variant={
                    task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
                <Badge variant="outline">{task.category}</Badge>
                <Badge
                  variant={
                    task.status === "Completed" ? "success" : task.status === "In Progress" ? "warning" : "default"
                  }
                >
                  {task.status}
                </Badge>
              </div>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0">
                    Show description
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>{task.description}</p>
                </CollapsibleContent>
              </Collapsible>
              <p className="mt-2">Total time: {task.totalTime}</p>
            </CardContent>
            <CardFooter>
              <Button variant={task.status === "Not Started" ? "default" : "secondary"} className="w-full">
                {task.status === "Not Started" ? "Start" : task.status === "In Progress" ? "Pause" : "Restart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

