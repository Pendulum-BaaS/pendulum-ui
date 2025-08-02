import { PendulumContext } from "../contexts/PendulumProvider";
import { Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";

interface AddCollectionFormProps {
  collections: string[];
  setCollections: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveCollection: React.Dispatch<React.SetStateAction<string>>;
  setIsAddCollection: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCollectionForm({
  collections,
  setCollections,
  setActiveCollection,
  setIsAddCollection,
}: AddCollectionFormProps) {
  const [collectionName, setCollectionName] = useState("");
  const { client } = useContext(PendulumContext);

  const handleAddNewCollection = async () => {
    if (collectionName.trim()) {
      try {
        const cleanedNewCollection = collectionName.trim();
        const response = await client.createCollection(cleanedNewCollection);
        if (response.success) {
          setCollections((prevCollections) =>
            [...prevCollections, cleanedNewCollection].sort(),
          );
          setActiveCollection(collections[0]);
          setIsAddCollection(false);
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.error(error);
      }
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
