"use server"

import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

interface CreateTaskData {
  title: string;
  description: string;
  priority: string;
  category: string;
}

export async function createTask(formData: FormData): Promise<{ error?: string }> {
  const title = formData.get("title");
  const description = formData.get("description");
  const priority = formData.get("priority");
  const category = formData.get("category");

  const data: CreateTaskData = {
    title: title?.toString() ?? "",
    description: description?.toString() ?? "",
    priority: priority?.toString() ?? "medium",
    category: category?.toString() ?? "work"
  };

  try {
    await api.post('/api/v1/tasks', data);
    revalidateTag("tasks");
    return {};
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "タスクの作成中にエラーが発生しました" };
  }
}
