import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import AddCollectionForm from "./AddCollectionForm";
import { pendulumGradient } from "../utils/gradients";

interface CollectionDrawerProps {
  collections: string[];
  activeCollection: string;
  setCollections: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveCollection: React.Dispatch<React.SetStateAction<string>>;
}

const drawerWidth = 280;

export default function CollectionDrawer({
  collections,
  activeCollection,
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
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "1rem",
              py: 2,
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
                sx={{
                  minHeight: 48,
                  mx: 1,
                  my: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                  backgroundColor:
                    activeCollection === collection
                      ? "rgba(106, 76, 147, 0.3)"
                      : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(106, 76, 147, 0.3)",
                  },
                }}
                selected={activeCollection === collection}
                onClick={() => setActiveCollection(collection)}
              >
                <ListItemText
                  primary={collection}
                  sx={{
                    "& .MuiListItemText-primary": {
                      ...(activeCollection === collection && {
                        background: pendulumGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: 600,
                      }),
                      ...(activeCollection !== collection && {
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 500,
                      }),
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />
          {isAddCollection ? (
            <AddCollectionForm
              setIsAddCollection={setIsAddCollection}
              setCollections={setCollections}
            />
          ) : (
            <Button
              variant="outlined"
              onClick={() => setIsAddCollection(true)}
              startIcon={<AddIcon />}
              sx={{
                m: 2,
                width: "calc(100% - 32px)",
                borderColor: "rgba(255, 255, 255, 0.23)",
                color: "#ffffff",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
              fullWidth
            >
              Add Collection
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
