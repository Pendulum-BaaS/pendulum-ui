import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface AddCollectionFormProps {
  setCollections: React.Dispatch<React.SetStateAction<string[]>>;
  setIsAddCollection: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCollectionForm({
  setCollections,
  setIsAddCollection,
}: AddCollectionFormProps) {
  const [collectionName, setCollectionName] = useState("");

  const handleAddNewCollection = () => {
    if (collectionName.trim()) {
      setCollections((prev) => [...prev, collectionName.trim()].sort());
      setIsAddCollection(false);
      /*
      TODO: implement backend route for adding collection
      */
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        gap: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="add-collection"
        label="New Collection"
        variant="outlined"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        size="small"
        sx={{
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#6a4c93",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIsAddCollection(false)}
          size="small"
          sx={{
            flex: 1,
            borderColor: "rgba(255, 255, 255, 0.23)",
            color: "#ffffff",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAddNewCollection}
          size="small"
          sx={{
            flex: 1,
          }}
          disabled={!collectionName.trim()}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
