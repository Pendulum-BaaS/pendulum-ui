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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await client.db.insert(
        collection,
        JSON.parse(textFieldContent),
      );
      if (result.success) {
        setDocuments((prev) => [...result.data, ...prev]);
        setIsAddNewDocument(false);
      } else {
        throw new Error("insert operation failed");
      }
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
    <Drawer
      open={isAddNewDocument}
      anchor="right"
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 500, md: 600 },
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 600 }}>
            Add Documents to {collection}
          </Typography>
          <IconButton
            onClick={() => setIsAddNewDocument(false)}
            size="small"
            sx={{
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 3 }}
          >
            Enter your document data as a JSON array. Each object represents a
            document to be added.
          </Typography>

          <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
            <Box
              sx={{
                width: 50,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRight: "none",
                borderRadius: "8px 0 0 8px",
                padding: "12px 8px",
                fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                fontSize: "13px",
                lineHeight: "20px",
                color: "rgba(255, 255, 255, 0.5)",
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
                  fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                  fontSize: "13px",
                  lineHeight: "20px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderRadius: "0 8px 8px 0",
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  "& fieldset": {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderRadius: "0 8px 8px 0",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6a4c93",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "100% !important",
                  overflow: "auto !important",
                  resize: "none",
                  padding: "12px 16px",
                  color: "#ffffff",
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

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />
        <Box
          sx={{
            p: 3,
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
            sx={{
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
            onClick={handleSubmit}
            type="submit"
            sx={{ px: 4 }}
          >
            Save Documents
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
