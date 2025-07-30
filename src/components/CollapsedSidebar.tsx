import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  StorageRounded,
  PeopleAltRounded,
  DescriptionRounded,
  LockRounded,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const drawerWidth = 60;

export default function CollapsedSidebar({ expand }: { expand: () => void }) {
  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          position: "fixed",
          top: "64px",
          height: "calc(100vh - 64px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          overflow: "hidden",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ pt: 2 }}>
        <Link to="/data" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              minHeight: 48,
              backgroundColor:
                location.pathname === "/data"
                  ? "rgba(106, 76, 147, 0.3)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/data"
                    ? "rgba(106, 76, 147, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/data"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/data" ? "#f39c12" : "#ffffff",
                justifyContent: "center",
                minWidth: "auto",
              }}
            >
              <StorageRounded />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              minHeight: 48,
              backgroundColor:
                location.pathname === "/users"
                  ? "rgba(106, 76, 147, 0.3)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/users"
                    ? "rgba(106, 76, 147, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/users"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/users" ? "#f39c12" : "#ffffff",
                justifyContent: "center",
                minWidth: "auto",
              }}
            >
              <PeopleAltRounded />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/logs" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              minHeight: 48,
              backgroundColor:
                location.pathname === "/logs"
                  ? "rgba(106, 76, 147, 0.3)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/logs"
                    ? "rgba(106, 76, 147, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/logs"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/logs" ? "#f39c12" : "#ffffff",
                justifyContent: "center",
                minWidth: "auto",
              }}
            >
              <DescriptionRounded />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/access" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              minHeight: 48,
              backgroundColor:
                location.pathname === "/access"
                  ? "rgba(106, 76, 147, 0.3)"
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/access"
                    ? "rgba(106, 76, 147, 0.4)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/access"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/access" ? "#f39c12" : "#ffffff",
                justifyContent: "center",
                minWidth: "auto",
              }}
            >
              <LockRounded />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </List>

      <Button
        variant="outlined"
        onClick={expand}
        sx={{
          m: 1,
          mt: "auto",
          mb: 2,
          minWidth: 0,
          width: 40,
          height: 40,
          borderColor: "rgba(255, 255, 255, 0.23)",
          color: "#ffffff",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        }}
      >
        <KeyboardDoubleArrowRightIcon />
      </Button>
    </Drawer>
  );
}
