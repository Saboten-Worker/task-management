"use server"

import { Task } from "@/components/tasks/task-table";
import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";

/**
 * タスク開始時のパラメータ型
 * @interface StartTaskParams
 * @property {number} taskId - 開始するタスクのID
 * @property {string} lastStartedAt - 開始時刻（ISO8601形式の文字列）
 */
interface StartTaskParams {
  taskId: number
  lastStartedAt: string
}

/**
 * タスクを開始するサーバーアクション
 * タスクのステータスを進行中に変更し、開始時刻を記録する
 * 
 * @param {StartTaskParams} params - タスク開始に必要なパラメータ
 * @returns {Promise<Task>} 更新されたタスク情報
 * @throws {Error} APIリクエストが失敗した場合
 */
export async function startTask({ taskId, lastStartedAt }: StartTaskParams): Promise<Task> {
  try {
    const updatedTask = await api.post(`/api/v1/tasks/${taskId}/start`, { 
      last_started_at: lastStartedAt 
    });
    
    revalidateTag("tasks");
    return {
      ...updatedTask,
      total_time: updatedTask.total_time || 0, // 合計時間が未定義の場合は0を設定
      status: "in_progress" as const
    };
  } catch (error) {
    console.error("Error starting task:", error);
    throw new Error("タスクの開始に失敗しました");
  }
}
