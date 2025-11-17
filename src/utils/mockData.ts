import type { Task } from "@/src/types/task";

const today = new Date().toISOString().split("T")[0];

export const mockTasks: Task[] = [
  {
    id: "1",
    name: "Fix login bug",
    description: "Resolve login issues affecting multiple users",
    priority: "high",
    dueDate: "2025-01-05",
    completed: true,
    createdAt: "2024-12-28T12:00:00Z",
    updatedAt: "2025-01-02T08:30:00Z",
  },
  {
    id: "2",
    name: "Team meeting",
    description: "Weekly sync-up with the team",
    priority: "medium",
    dueDate: today,
    completed: false,
    createdAt: "2025-01-10T09:00:00Z",
    updatedAt: "2025-01-10T09:00:00Z",
  },
  {
    id: "3",
    name: "Prepare presentation",
    description: "Prepare slides for client meeting",
    priority: "high",
    dueDate: "2025-12-01",
    completed: false,
    createdAt: "2025-01-15T11:20:00Z",
    updatedAt: "2025-01-15T11:20:00Z",
  },
  {
    id: "4",
    name: "Fix minor UI bugs",
    description: "Resolve small UI issues reported by QA",
    priority: "medium",
    dueDate: today,
    completed: true,
    createdAt: "2025-01-14T10:00:00Z",
    updatedAt: "2025-01-14T10:00:00Z",
  },
  {
    id: "5",
    name: "Database backup",
    description: "Take a full backup of production database",
    priority: "low",
    dueDate: "2024-12-31",
    completed: true,
    createdAt: "2024-12-15T10:00:00Z",
    updatedAt: "2024-12-31T10:00:00Z",
  },
  {
    id: "6",
    name: "Design landing page",
    description: "Create a modern landing page for marketing campaign",
    priority: "medium",
    dueDate: "2025-12-05",
    completed: false,
    createdAt: "2025-01-22T10:30:00Z",
    updatedAt: "2025-01-22T10:30:00Z",
  },
  {
    id: "7",
    name: "Update project board",
    description: "Move completed tasks to done column and update progress",
    priority: "low",
    dueDate: today,
    completed: true,
    createdAt: "2025-01-16T11:00:00Z",
    updatedAt: "2025-01-16T11:00:00Z",
  },
  {
    id: "8",
    name: "Conduct code audit",
    description: "Audit existing code for potential security risks",
    priority: "high",
    dueDate: "2025-10-15",
    completed: false,
    createdAt: "2025-01-18T14:00:00Z",
    updatedAt: "2025-01-18T14:00:00Z",
  },
  {
    id: "9",
    name: "Daily standup notes",
    description: "Record notes and action items from today's standup",
    priority: "low",
    dueDate: today,
    completed: false,
    createdAt: "2025-01-12T09:15:00Z",
    updatedAt: "2025-01-12T09:15:00Z",
  },
  {
    id: "10",
    name: "Email campaign setup",
    description: "Prepare and schedule email campaigns for new product launch",
    priority: "medium",
    dueDate: "2025-11-20",
    completed: false,
    createdAt: "2025-01-23T09:00:00Z",
    updatedAt: "2025-01-23T09:00:00Z",
  },
  {
    id: "11",
    name: "Fix CSS issues",
    description: "Resolve styling issues in different screen sizes",
    priority: "low",
    dueDate: "2025-01-15",
    completed: true,
    createdAt: "2025-01-10T13:00:00Z",
    updatedAt: "2025-01-15T09:00:00Z",
  },
  {
    id: "12",
    name: "Plan team outing",
    description: "Organize a team building outing for next month",
    priority: "medium",
    dueDate: "2025-11-25",
    completed: false,
    createdAt: "2025-01-22T12:00:00Z",
    updatedAt: "2025-01-22T12:00:00Z",
  },
  {
    id: "13",
    name: "Optimize performance",
    description: "Improve application performance for high traffic",
    priority: "high",
    dueDate: "2025-05-28",
    completed: false,
    createdAt: "2025-01-20T14:00:00Z",
    updatedAt: "2025-01-20T14:00:00Z",
  },
  {
    id: "14",
    name: "Sync with design team",
    description: "Coordinate on UI improvements and feedback",
    priority: "medium",
    dueDate: today,
    completed: false,
    createdAt: "2025-01-18T12:00:00Z",
    updatedAt: "2025-01-18T12:00:00Z",
  },
  {
    id: "15",
    name: "Review team guidelines",
    description: "Update team guidelines based on recent project changes",
    priority: "medium",
    dueDate: "2025-12-08",
    completed: false,
    createdAt: "2025-01-20T09:30:00Z",
    updatedAt: "2025-01-20T09:30:00Z",
  },
];

const tasks: Task[] = [...mockTasks];

export const getTasks = (): Task[] => tasks;

export const getTaskById = (id: string): Task | undefined =>
  tasks.find((task) => task.id === id);

export const createTask = (
  taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
): Task => {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    completed: taskData.completed ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: string,
  taskData: Partial<Task>
): Task | null => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...taskData,
    updatedAt: new Date().toISOString(),
  };
  return tasks[index];
};

export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
};
