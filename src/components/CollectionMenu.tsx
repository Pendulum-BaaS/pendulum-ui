import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useState } from "react";

interface CollectionDrawerProps {
  collections: string[];
  setCollections: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveCollection: React.Dispatch<React.SetStateAction<string>>;
}

const drawerWidth = 240;

export default function CollectionDrawer({
  collections,
  setCollections,
  setActiveCollection,
}: CollectionDrawerProps) {
  const [isAddCollection, setIsAddCollection] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          maxHeight: "100%",
          overflow: "auto",
          backgroundColor: "inherit",
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <ListSubheader
            sx={{
              backgroundColor: "inherit",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            Collections
          </ListSubheader>
        </Box>

        <Box
          sx={{
            height: "auto",
            overflow: "auto",
            minHeight: 0,
            maxHeight: "100%",
          }}
        >
          <List sx={{ padding: 0 }}>
            {collections.map((collection, idx) => (
              <ListItemButton
                key={collection + idx}
                sx={{ minHeight: 48 }}
                onClick={() => setActiveCollection(collection)}
              >
                <ListItemText primary={collection} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Divider />
          <Button
            variant="contained"
            onClick={() => setIsAddCollection(true)}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: 1,
              margin: 2,
              width: "calc(100% - 32px)",
            }}
          >
            <AddIcon />
            Add Collection
          </Button>
        </Box>
      </Box>
    </>
  );
}
