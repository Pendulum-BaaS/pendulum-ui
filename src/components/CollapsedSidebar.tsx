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
} from "@mui/icons-material";

const drawerWidth = 60;

export default function CollapsedSidebar({ expand }: { expand: () => void }) {
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
              mx: 0.5,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#ffffff",
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
              mx: 0.5,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#ffffff",
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
              mx: 0.5,
              borderRadius: 2,
              justifyContent: "center",
              px: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#ffffff",
                justifyContent: "center",
                minWidth: "auto",
              }}
            >
              <DescriptionRounded />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)", my: 2 }} />

      <List>
        <ListItemButton
          sx={{
            mx: 0.5,
            borderRadius: 2,
            justifyContent: "center",
            px: 0,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#ffffff",
              justifyContent: "center",
              minWidth: "auto",
            }}
          >
            <DescriptionRounded />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton
          sx={{
            mx: 0.5,
            borderRadius: 2,
            justifyContent: "center",
            px: 0,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: "#ffffff",
              justifyContent: "center",
              minWidth: "auto",
            }}
          >
            <PeopleAltRounded />
          </ListItemIcon>
        </ListItemButton>
      </List>
      <Divider />

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
