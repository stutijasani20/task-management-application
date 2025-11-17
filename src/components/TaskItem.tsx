import { useState } from "react";
import {
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Box,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import type { Task, Priority } from "@/src/types/task";
import dayjs from "dayjs";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig: Record<
  Priority,
  { color: string; bgcolor: string; label: string }
> = {
  high: { color: "#d32f2f", bgcolor: "#ffebee", label: "High" },
  medium: { color: "#f57c00", bgcolor: "#fff3e0", label: "Medium" },
  low: { color: "#388e3c", bgcolor: "#e8f5e9", label: "Low" },
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formattedDate = dayjs(task.dueDate).format("MMM DD, YYYY");
  const isOverdue = dayjs(task.dueDate).isBefore(dayjs(), "day");
  const config = priorityConfig[task.priority];

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(task.id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <TableRow
        hover
        sx={{
          "&:hover": {
            bgcolor: "#f8f9fa",
            transition: "background-color 0.2s ease",
          },
        }}
      >
        <TableCell>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "#2c3e50",
            }}
          >
            {task.name}
          </Typography>
        </TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          <Typography
            variant="body2"
            sx={{
              color: "#546e7a",
              maxWidth: { xs: 150, sm: 250, md: 400 },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.description}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={config.label}
            size="small"
            sx={{
              bgcolor: config.bgcolor,
              color: config.color,
              fontWeight: 600,
              borderRadius: 2,
              height: { xs: 24, sm: 28 },
              fontSize: { xs: "0.7rem", sm: "0.8125rem" },
            }}
          />
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <CalendarIcon
              sx={{
                fontSize: { xs: 12, sm: 14 },
                color: isOverdue ? "#d32f2f" : "#546e7a",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: 12, sm: 14 },
                color: isOverdue ? "#d32f2f" : "#546e7a",
                fontWeight: isOverdue ? 600 : 400,
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {task.completed && (
            <Tooltip title="Completed">
              <CheckCircleIcon
                sx={{
                  color: "#4caf50",
                  fontSize: 24,
                }}
              />
            </Tooltip>
          )}
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Tooltip title="Edit task">
              <IconButton
                size="small"
                onClick={() => onEdit(task)}
                aria-label="edit task"
                sx={{
                  color: "#1976d2",
                  "&:hover": {
                    bgcolor: "#e3f2fd",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton
                size="small"
                onClick={handleDeleteClick}
                aria-label="delete task"
                sx={{
                  color: "#d32f2f",
                  "&:hover": {
                    bgcolor: "#ffebee",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the task &ldquo;{task.name}&ldquo;?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
