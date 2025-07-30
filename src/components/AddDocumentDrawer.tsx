import { useContext, useState, useEffect } from "react";
import {
  Drawer,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { PendulumContext } from "../contexts/PendulumProvider";
import CloseIcon from "@mui/icons-material/Close";
import { type Document } from "../types/types";

interface AddDocumentDrawerProps {
  isAddNewDocument: boolean;
  setIsAddNewDocument: React.Dispatch<React.SetStateAction<boolean>>;
  fields: string[];
  collection: string;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const EXCLUDED_FIELDS = ["_id", "createdAt", "createdBy", "updatedAt"];

export default function AddDocumentDrawer({
  isAddNewDocument,
  setIsAddNewDocument,
  fields,
  collection,
  setDocuments,
}: AddDocumentDrawerProps) {
  const defaultJSON = JSON.stringify(
    [
      fields
        .filter((col) => !EXCLUDED_FIELDS.includes(col))
        .reduce(
          (acc, field) => {
            acc[field] = "";
            return acc;
          },
          {} as Record<string, string>,
        ),
    ],
    null,
    2,
  );

  const [textFieldContent, setTextFieldContent] = useState("");
  const { client } = useContext(PendulumContext);

  const handleSubmit = (e: React.FormEvent) => {
    const insertDoc = async (newItems: Document[]) => {
      const response = await client.db.insert(collection, newItems);
      setDocuments((prev) => [...response.data, ...prev]);
    };

    e.preventDefault();
    try {
      const newItems = JSON.parse(textFieldContent);
      insertDoc(newItems);
      setIsAddNewDocument(false);
    } catch (error) {
      console.error(error);
      alert("Invalid JSON format. Please check your syntax.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldContent(event.target.value);
  };

  const lines = textFieldContent.split("\n");
  const lineNumbers = lines.map((_, idx) => idx + 1).join("\n");

  useEffect(() => {
    setTextFieldContent(defaultJSON);
  }, [defaultJSON]);

  return (
    <Drawer open={isAddNewDocument} anchor="right">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="h2">
            Add Documents to {collection}
          </Typography>
          <IconButton
            onClick={() => setIsAddNewDocument(false)}
            size="small"
            sx={{ alignItems: "center" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your document data as a JSON array. Each object represents a
            document to be added.
          </Typography>

          <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
            <Box
              sx={{
                width: 40,
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
                borderRight: "none",
                padding: "8px 4px",
                fontFamily: "monospace",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#666",
                textAlign: "right",
                whiteSpace: "pre",
                overflow: "hidden",
              }}
            >
              {lineNumbers}
            </Box>

            <TextField
              id="documentContent"
              value={textFieldContent}
              onChange={handleChange}
              multiline
              variant="outlined"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  height: "100%",
                  alignItems: "flex-start",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  lineHeight: "20px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
                "& .MuiOutlinedInput-input": {
                  height: "100% !important",
                  overflow: "auto !important",
                  resize: "none",
                  padding: "8px 12px",
                },
                "& fieldset": {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
              InputProps={{
                style: {
                  height: "100%",
                  alignItems: "flex-start",
                },
              }}
            />
          </Box>
        </Box>

        <Divider />
        <Box
          sx={{
            p: 2,
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setIsAddNewDocument(false);
              setTextFieldContent(defaultJSON);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} type="submit">
            Save Documents
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
