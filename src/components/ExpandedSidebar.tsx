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
              <ListItemText primary="Data" />
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
              <ListItemText primary="Users" />
            </ListItemButton>
          </Link>
          <Link to="/logs" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton key="logs" sx={{ minHeight: 48 }}>
              <ListItemIcon>
                <DescriptionRounded />
              </ListItemIcon>
              <ListItemText primary="Logs" />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItemButton key="tbd1" sx={{ minHeight: 48 }}>
            <ListItemIcon>
              <DescriptionRounded />
            </ListItemIcon>
            <ListItemText primary="TBD" />
          </ListItemButton>
          <ListItemButton key="tbd2" sx={{ minHeight: 48 }}>
            <ListItemIcon>
              <PeopleAltRounded />
            </ListItemIcon>
            <ListItemText primary="TBD 2.0" />
          </ListItemButton>
        </List>
        <Divider />
        <Button
          variant="contained"
          onClick={collapse}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 2,
            marginTop: "auto",
            width: "auto",
            background: "inherit",
            color: "inherit",
          }}
        >
          <KeyboardDoubleArrowLeftIcon />
          Collapse
        </Button>
      </Drawer>
    </>
  );
}
