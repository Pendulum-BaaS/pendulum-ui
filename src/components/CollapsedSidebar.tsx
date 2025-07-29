import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button, Box } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  StorageRounded,
  PeopleAltRounded,
  DescriptionRounded,
} from "@mui/icons-material";

const drawerWidth = 60;

export default function CollapsedSidebar({ expand }: { expand: () => void }) {
  return (
    <>
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
            background: "inherit",
            overflow: "hidden",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <Link to="/data" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton key="data" sx={{ minHeight: 48 }}>
              <ListItemIcon>
                <StorageRounded />
              </ListItemIcon>
            </ListItemButton>
          </Link>
          <Link
            to="/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton key="users" sx={{ minHeight: 48 }}>
              <ListItemIcon>
                <PeopleAltRounded />
              </ListItemIcon>
            </ListItemButton>
          </Link>
          <Link to="/logs" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton key="logs" sx={{ minHeight: 48 }}>
              <ListItemIcon>
                <DescriptionRounded />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItemButton key="tbd1" sx={{ minHeight: 48 }}>
            <ListItemIcon>
              <DescriptionRounded />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton key="tbd2" sx={{ minHeight: 48 }}>
            <ListItemIcon>
              <PeopleAltRounded />
            </ListItemIcon>
          </ListItemButton>
        </List>
        <Divider />

        <Button
          variant="contained"
          onClick={expand}
          sx={{
            margin: 2,
            color: "inherit",
            background: "inherit",
            marginTop: "auto",
            width: "auto",
            minWidth: 0,
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </Drawer>
    </>
  );
}
