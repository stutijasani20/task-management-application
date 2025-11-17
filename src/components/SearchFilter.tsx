import {
  TextField,
  InputAdornment,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import type { Priority } from "@/src/types/task";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  priorityFilter: Priority | "all";
  onPriorityChange: (priority: Priority | "all") => void;
}

const priorityOptions: {
  value: Priority | "all";
  label: string;
  color: string;
}[] = [
  { value: "all", label: "All Priorities", color: "#757575" },
  { value: "high", label: "High", color: "#d32f2f" },
  { value: "medium", label: "Medium", color: "#f57c00" },
  { value: "low", label: "Low", color: "#388e3c" },
];

export default function SearchFilter({
  value,
  onChange,
  priorityFilter,
  onPriorityChange,
}: SearchFilterProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          placeholder="Search tasks by name or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#78909c" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "white",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#bdbdbd",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiInputBase-input": {
              py: 1.5,
              fontSize: "1rem",
            },
          }}
        />

        <FormControl
          sx={{
            minWidth: { xs: "100%", sm: 220 },
          }}
        >
          <InputLabel
            id="priority-filter-label"
            sx={{ bgcolor: "white", px: 0.5 }}
          >
            Priority
          </InputLabel>
          <Select
            labelId="priority-filter-label"
            value={priorityFilter}
            label="Priority"
            size="small"
            onChange={(e) =>
              onPriorityChange(e.target.value as Priority | "all")
            }
            renderValue={(selected) => {
              const option = priorityOptions.find(
                (opt) => opt.value === selected
              );
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pl: 0.5,
                  }}
                >
                  <FilterIcon sx={{ color: "#78909c", fontSize: 20 }} />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: option?.color || "#757575",
                    }}
                  />
                  <span>{option?.label || "All Priorities"}</span>
                </Box>
              );
            }}
            sx={{
              borderRadius: 2,
              bgcolor: "white",
              height: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e0e0e0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#bdbdbd",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#667eea",
              },
            }}
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: option.color,
                    }}
                  />
                  {option.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}
