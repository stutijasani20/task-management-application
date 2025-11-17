import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { Add as AddIcon, CloudDone as CloudDoneIcon, Computer as ComputerIcon } from "@mui/icons-material";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import SearchFilter from "./SearchFilter";
import {
  addTask,
  updateTask,
  removeTask,
  setSearchQuery,
  setPriorityFilter,
  clearError,
  setInitialTasks,
} from "@/store";
import type { RootState, AppDispatch } from "@/store";
import type { Task, TaskFormData, Priority } from "@/src/types/task";

interface TaskListProps {
  initialTasks?: Task[];
  isServerSide?: boolean;
}

export default function TaskList({ initialTasks, isServerSide = false }: TaskListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error, searchQuery, priorityFilter } = useSelector(
    (state: RootState) => state.tasks
  );

  // Initialize tasks from server-side props if provided
  useEffect(() => {
    if (initialTasks && initialTasks.length > 0) {
      dispatch(setInitialTasks(initialTasks));
    }
  }, [initialTasks, dispatch]);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.name.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    return filtered;
  }, [tasks, searchQuery, priorityFilter]);

  const handleAddTask = async (data: TaskFormData) => {
    try {
      await dispatch(addTask(data)).unwrap();
      setFormOpen(false);
      setSnackbarMessage("Task added successfully!");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;

    try {
      await dispatch(updateTask({ id: editingTask.id, data })).unwrap();
      setFormOpen(false);
      setEditingTask(undefined);
      setSnackbarMessage("Task updated successfully!");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await dispatch(removeTask(id)).unwrap();
      setSnackbarMessage("Task deleted successfully!");
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingTask(undefined);
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handlePriorityFilterChange = (priority: Priority | "all") => {
    dispatch(setPriorityFilter(priority));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <Box
      sx={{ bgcolor: "#f5f7fa", px: { xs: 0, md: 3 }, py: { xs: 0, md: 3 } }}
    >
      <Card
        sx={{
          mb: 3,
          borderRadius: 2,
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                    }}
                  >
                    Task Manager
                  </Typography>
                  <Chip
                    icon={isServerSide ? <CloudDoneIcon /> : <ComputerIcon />}
                    label={isServerSide ? "Server-Side" : "Client-Side"}
                    size="small"
                    color={isServerSide ? "primary" : "secondary"}
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.9,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  Organize and track your tasks efficiently
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(true)}
              disabled={loading}
              fullWidth={false}
              sx={{
                bgcolor: "white",
                color: "#667eea",
                borderRadius: 2,
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.5 },
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                fontSize: { xs: "0.875rem", sm: "1rem" },
                "&:hover": {
                  bgcolor: "#f8f9fa",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              New Task
            </Button>
          </Box>
        </CardContent>
      </Card>

      <SearchFilter
        value={searchQuery}
        onChange={handleSearchChange}
        priorityFilter={priorityFilter}
        onPriorityChange={handlePriorityFilterChange}
      />

      {loading && tasks.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
            {searchQuery ? "🔍 No tasks found" : "📝 No tasks yet"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchQuery
              ? "Try adjusting your search terms"
              : 'Click "New Task" to create your first task!'}
          </Typography>
        </Card>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            overflow: "auto",
            maxHeight: "calc(100vh - 370px)",
          }}
        >
          <Table sx={{ minWidth: { xs: 600, sm: 650 } }}>
            <TableHead sx={{ position: "sticky", top: 0, zIndex: 5 }}>
              <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                    display: { xs: "table-cell", sm: "table-cell" },
                  }}
                >
                  Task Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  }}
                >
                  Priority
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  }}
                >
                  Due Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                    width: 100,
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TaskForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
        loading={loading}
      />

      <Snackbar
        open={snackbarOpen || !!error}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
