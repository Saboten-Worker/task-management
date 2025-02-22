"use server"

interface StartTaskParams {
  taskId: number;
  lastStartedAt: string;
}

export async function startTask({ taskId, lastStartedAt }: StartTaskParams) {
  try {
    const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/tasks/${taskId}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ last_started_at: lastStartedAt }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to start task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error starting task:", error);
    throw error;
  }
}
