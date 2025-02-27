"use server"

import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

export async function completeTask({ taskId }: { taskId: number }) {
    try {
        const response = await api.post(`/api/v1/tasks/${taskId}/complete`, {});
        revalidateTag("tasks");
        return response;
    } catch (error) {
        console.error("Error completing task:", error);
        throw new Error("タスクの完了処理に失敗しました");
    }
}
