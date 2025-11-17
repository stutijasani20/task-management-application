export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  name: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed?: boolean;
}
