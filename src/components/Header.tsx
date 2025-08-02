import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        width: "100vw",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 2 }}
        >
          <img
            src="/admin/pendulum.svg"
            alt="Pendulum Logo"
            style={{ height: "40px", width: "40px" }}
          ></img>
          <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600 }}>
            Pendulum
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderColor: "rgba(255, 255, 255, 0.23)",
            color: "#ffffff",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          <LogoutIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
