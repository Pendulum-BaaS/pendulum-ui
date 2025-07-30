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

interface EditDocumentDrawerProps {
  isEditDocument: boolean;
  setIsEditDocument: React.Dispatch<React.SetStateAction<boolean>>;
  activeCollection: string;
  selectedDocument: Document;
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const EXCLUDED_FIELDS = ["_id", "createdAt", "createdBy", "updatedAt"];

export default function EditDocumentDrawer({
  isEditDocument,
  setIsEditDocument,
  activeCollection,
  selectedDocument,
  setDocuments,
}: EditDocumentDrawerProps) {
  const getEditableFields = () => {
    return Object.keys(selectedDocument)
      .filter((col) => !EXCLUDED_FIELDS.includes(col))
      .reduce(
        (acc, field) => {
          acc[field] = selectedDocument[field];
          return acc;
        },
        {} as Record<string, string>,
      );
  };
  const defaultJSON = JSON.stringify(getEditableFields(), null, 2);

  const [textFieldContent, setTextFieldContent] = useState("");
  const { client } = useContext(PendulumContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedFields = JSON.parse(textFieldContent);
      const newItem = {
        ...(selectedDocument.createdAt && {
          createdAt: selectedDocument.createdAt,
        }),
        ...(selectedDocument.createdBy && {
          createdBy: selectedDocument.createdBy,
        }),
        ...updatedFields,
      };

      const result = await client.db.replace(
        activeCollection,
        selectedDocument._id,
        newItem,
      );

      if (result.success) {
        setDocuments((prev) =>
          prev.map((doc) =>
            doc._id === selectedDocument._id ? result.data : doc,
          ),
        );
        setIsEditDocument(false);
      } else {
        throw new Error("Update operation failed");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof SyntaxError) {
        alert("Invalid JSON format. Please check your syntax.");
      } else {
        alert(error);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldContent(event.target.value);
  };

  const lines = textFieldContent.split("\n");
  const lineNumbers = lines.map((_, idx) => idx + 1).join("\n");

  useEffect(() => {
    if (isEditDocument && selectedDocument) {
      setTextFieldContent(defaultJSON);
    }
  }, [isEditDocument, selectedDocument, defaultJSON]);

  return (
    <Drawer
      open={isEditDocument}
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
            Edit document from {activeCollection}
          </Typography>
          <IconButton
            onClick={() => setIsEditDocument(false)}
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
            Enter your document data as a JSON array.
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
              setIsEditDocument(false);
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
            Update Document
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
