import type { NextApiRequest, NextApiResponse } from "next";
import { getTasks, createTask } from "@/src/utils";
import type { Task } from "@/src/types/task";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | Task | { error: string }>
) {
  await delay(500);

  if (req.method === "GET") {
    const tasks = getTasks();
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { name, description, priority, dueDate, completed } = req.body;

    if (!name || !description || !priority || !dueDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTask = createTask({
      name,
      description,
      priority,
      dueDate,
      completed: completed ?? false,
    });
    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
