import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
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

const drawerWidth = 200;

export default function ExpandedSidebar({
  collapse,
}: {
  collapse: () => void;
}) {
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
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <StorageRounded />
            </ListItemIcon>
            <ListItemText
              primary="Data"
              sx={{
                "& .MuiListItemText-primary": {
                  color: "#ffffff",
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </Link>
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <PeopleAltRounded />
            </ListItemIcon>
            <ListItemText
              primary="Users"
              sx={{
                "& .MuiListItemText-primary": {
                  color: "#ffffff",
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </Link>
        <Link to="/logs" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton
            sx={{
              mx: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <DescriptionRounded />
            </ListItemIcon>
            <ListItemText
              primary="Logs"
              sx={{
                "& .MuiListItemText-primary": {
                  color: "#ffffff",
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </Link>
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)", my: 2 }} />

      <List>
        <ListItemButton
          sx={{
            mx: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <DescriptionRounded />
          </ListItemIcon>
          <ListItemText
            primary="TBD"
            sx={{
              "& .MuiListItemText-primary": {
                color: "#ffffff",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            mx: 1,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#ffffff" }}>
            <PeopleAltRounded />
          </ListItemIcon>
          <ListItemText
            primary="TBD 2.0"
            sx={{
              "& .MuiListItemText-primary": {
                color: "#ffffff",
                fontWeight: 500,
              },
            }}
          />
        </ListItemButton>
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
