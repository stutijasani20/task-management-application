import type { NextApiRequest, NextApiResponse } from "next";
import { getTaskById, updateTask, deleteTask } from "@/src/utils";
import type { Task } from "@/src/types/task";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | { error: string } | { success: boolean }>
) {
  await delay(500);

  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  if (req.method === "GET") {
    const task = getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(task);
  }

  if (req.method === "PUT") {
    const updatedTask = updateTask(id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(updatedTask);
  }

  if (req.method === "DELETE") {
    const success = deleteTask(id);
    if (!success) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
