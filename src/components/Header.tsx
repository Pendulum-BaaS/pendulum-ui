import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "inherit",
        width: "100vw",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <img
            src="src/assets/logo.png"
            alt="Logo"
            style={{ height: "40px" }}
          ></img>
        </Box>
        <Button
          variant="contained"
          sx={{ background: "inherit", color: "inherit" }}
        >
          <LogoutIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
