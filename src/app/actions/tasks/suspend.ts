"use server"

import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

interface SuspendTaskParams {
    taskId: number;
}

export async function suspendTask({ taskId }: SuspendTaskParams) {
    try {
        const response = await api.post(`/api/v1/tasks/${taskId}/suspend`, {});
        revalidateTag("tasks");
        return response;
    } catch (error) {
        console.error("Error suspending task:", error);
        throw new Error("タスクの一時停止に失敗しました");
    }
}
