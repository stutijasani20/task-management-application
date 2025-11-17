import { useRouter } from "next/router";
import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import { CloudDone as CloudDoneIcon, Computer as ComputerIcon } from "@mui/icons-material";

export default function Navigation() {
  const router = useRouter();
  const isServerSide = router.pathname === "/";

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: 2,
        bgcolor: "transparent",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ButtonGroup variant="outlined" size="large">
        <Button
          startIcon={<CloudDoneIcon />}
          onClick={() => router.push("/")}
          variant={isServerSide ? "contained" : "outlined"}
          sx={{
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Server-Side Rendering
        </Button>
        <Button
          startIcon={<ComputerIcon />}
          onClick={() => router.push("/tasks")}
          variant={!isServerSide ? "contained" : "outlined"}
          sx={{
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Client-Side Rendering
        </Button>
      </ButtonGroup>
    </Paper>
  );
}