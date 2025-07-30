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
        margin: 2,
        width: "calc(100% - 32px)",
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
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIsAddCollection(false)}
          sx={{
            width: "auto",
            margin: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAddNewCollection}
          sx={{
            width: "auto",
            margin: 1,
          }}
          disabled={!collectionName.trim()}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}
