import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Document } from "../types/types";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDocumentDrawer from "./AddDocumentDrawer";
import { PendulumContext } from "../contexts/PendulumProvider";

interface DataTableProps {
  collections: string[];
  setCollections: React.Dispatch<React.SetStateAction<string[]>>;
  activeCollection: string;
  setActiveCollection: React.Dispatch<React.SetStateAction<string>>;
  columns: GridColDef[];
  setColumns: React.Dispatch<React.SetStateAction<GridColDef[]>>;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

export default function DataTable({
  collections,
  setCollections,
  activeCollection,
  setActiveCollection,
  columns,
  setColumns,
  documents,
  setDocuments,
}: DataTableProps) {
  const [isAddNewDocument, setIsAddNewDocument] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { client } = useContext(PendulumContext);

  const paginationModel = { page: 0, pageSize: 10 };

  const fields = columns.map((col) => col.field);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  console.log(activeCollection);
  const handleClearCollection = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to clear all documents? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      const result = await client.db.removeAll(activeCollection);
      if (result.success) {
        setDocuments([]);
        setColumns([]);
        handleMenuClose();
      } else {
        throw new Error("delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCollection = () => {
    // TODO: Implement backend route that actually removes collection from db
    const confirmed = window.confirm(
      `Are you sure you want to delete this collection? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setCollections((prev) => prev.filter((p) => p !== activeCollection));
    setActiveCollection(collections[0]);
    handleMenuClose();
  };
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            flex: 1,
          }}
        >
          {activeCollection}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            onClick={() => setIsAddNewDocument(true)}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Add
          </Button>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 2,
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 2,
            minWidth: 200,
            "& .MuiMenuItem-root": {
              color: "#ffffff",
              px: 2,
              py: 1.5,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClearCollection}>
          <ListItemIcon sx={{ color: "#ffffff", minWidth: 36 }}>
            <ClearIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Clear Collection" />
        </MenuItem>

        <MenuItem
          onClick={handleDeleteCollection}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(231, 76, 60, 0.1)",
            },
            "& .MuiListItemIcon-root": {
              color: "#e74c3c",
            },
            "& .MuiListItemText-primary": {
              color: "#e74c3c",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#e74c3c", minWidth: 36 }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete Collection" />
        </MenuItem>
      </Menu>

      <DataGrid
        rows={documents}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{
          flex: 1,
          borderRadius: 2,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
        getRowId={(row) => row._id}
      />

      <AddDocumentDrawer
        isAddNewDocument={isAddNewDocument}
        setIsAddNewDocument={setIsAddNewDocument}
        fields={fields}
        collection={activeCollection}
        setDocuments={setDocuments}
      />
    </Box>
  );
}
