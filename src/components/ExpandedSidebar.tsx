import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Button } from "@mui/material";
import {
  StorageRounded,
  PeopleAltRounded,
  DescriptionRounded,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { pendulumGradient } from "../utils/gradients";

const drawerWidth = 200;

export default function ExpandedSidebar({
  collapse,
}: {
  collapse: () => void;
}) {
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
              background:
                location.pathname === "/data"
                  ? pendulumGradient
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/data"
                    ? // ? "rgba(106, 76, 147, 0.4)"
                      "transparent"
                    : "rgba(255, 255, 255, 0.08)",
                background:
                  location.pathname === "/data"
                    ? pendulumGradient
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/data"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/data" ? "#1a1a2e" : "#ffffff",
                fontWeight: location.pathname === "/data" ? "bold" : "normal",
              }}
            >
              <StorageRounded />
            </ListItemIcon>
            <ListItemText
              primary="Data"
              sx={{
                "& .MuiListItemText-primary": {
                  color: location.pathname === "/data" ? "#1a1a2e" : "#ffffff",
                  fontWeight: location.pathname === "/data" ? 700 : 500,
                },
              }}
            />
          </ListItemButton>
        </Link>

        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              background:
                location.pathname === "/users"
                  ? pendulumGradient
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/users"
                    ? "transparent"
                    : "rgba(255, 255, 255, 0.08)",
                background:
                  location.pathname === "/users"
                    ? pendulumGradient
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/users"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/users" ? "#1a1a2e" : "#ffffff",
              }}
            >
              <PeopleAltRounded />
            </ListItemIcon>
            <ListItemText
              primary="Users"
              sx={{
                "& .MuiListItemText-primary": {
                  color: location.pathname === "/users" ? "#1a1a2e" : "#ffffff",
                  fontWeight: location.pathname === "/users" ? 700 : 500,
                },
              }}
            />
          </ListItemButton>
        </Link>

        <Link to="/logs" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              my: 1,
              borderRadius: 2,
              background:
                location.pathname === "/logs"
                  ? pendulumGradient
                  : "transparent",
              "&:hover": {
                backgroundColor:
                  location.pathname === "/logs"
                    ? "transparent"
                    : "rgba(255, 255, 255, 0.08)",
                background:
                  location.pathname === "/logs"
                    ? pendulumGradient
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
            selected={location.pathname === "/logs"}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === "/logs" ? "#1a1a2e" : "#ffffff",
              }}
            >
              <DescriptionRounded />
            </ListItemIcon>
            <ListItemText
              primary="Logs"
              sx={{
                "& .MuiListItemText-primary": {
                  color: location.pathname === "/logs" ? "#1a1a2e" : "#ffffff",
                  fontWeight: location.pathname === "/logs" ? 700 : 500,
                },
              }}
            />
          </ListItemButton>
        </Link>
      </List>

      <Button
        variant="outlined"
        onClick={collapse}
        startIcon={<KeyboardDoubleArrowLeftIcon />}
        sx={{
          mx: 2,
          mt: "auto",
          mb: 2,
          borderColor: "rgba(255, 255, 255, 0.23)",
          color: "#ffffff",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        }}
      >
        Collapse
      </Button>
    </Drawer>
  );
}
