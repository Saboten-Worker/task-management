"use server"

import { revalidateTag } from "next/cache";

interface SuspendTaskParams {
    taskId: number;
}

export async function suspendTask({ taskId }: SuspendTaskParams) {
    try {
        console.log(`${process.env.RAILS_API_URL}/api/v1/tasks/${taskId}/start`)
        const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/tasks/${taskId}/suspend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(response);
            throw new Error("Failed to suspend task");
        }

        revalidateTag("tasks");
        return await response.json();
    } catch (error) {
        console.error("Error suspending task:", error);
        throw error;
    }
}
  