"use server"

import { revalidateTag } from "next/cache"

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
    const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("タスクの作成に失敗しました");
    }

    revalidateTag("tasks")
    return {};
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "タスクの作成中にエラーが発生しました" };
  }
}
