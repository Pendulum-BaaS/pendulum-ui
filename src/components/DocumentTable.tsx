import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
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
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import AddDocumentDrawer from "./AddDocumentDrawer";
import EditDocumentDrawer from "./EditDocumentDrawer";
import CollectionPermissionsDrawer from "./CollectionPermissionsDrawer";
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
  const [isEditDocument, setIsEditDocument] = useState(false);
  const [isPermissionsDrawer, setIsPermissionsDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { client } = useContext(PendulumContext);

  const paginationModel = { page: 0, pageSize: 10 };

  const fields = columns.map((col) => col.field);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

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

  const handleEditDocument = () => setIsEditDocument(true);

  const handleDeleteDocuments = async () => {
    /* TODO: update logic here after simplifying backend routes */
    try {
      let result;
      if (selectedRows.length === 1) {
        result = await client.db.removeOne(activeCollection, selectedRows[0]);
      } else if (selectedRows.length === documents.length) {
        result = await client.db.removeAll(activeCollection);
      } else {
        for (let i = 0; i < selectedRows.length; i++) {
          await client.db.removeOne(activeCollection, selectedRows[i]);
        }
        result = {
          success: true,
        };
      }
      if (result.success) {
        setDocuments((prev) =>
          prev.filter((p) => !selectedRows.includes(p._id)),
        );
        setSelectedRows([]);
      } else {
        throw new Error("Failed to delete documents");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    switch (newSelection.type) {
      case "include":
        setSelectedRows([...newSelection.ids] as string[]);
        break;
      case "exclude":
        setSelectedRows(
          documents
            .map((doc) => doc._id)
            .filter((_id) => !newSelection.ids.has(_id)),
        );
        break;
    }
  };

  const renderActionButtons = () => {
    const selectedCount = selectedRows.length;

    if (selectedCount === 0) {
      return (
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
      );
    } else if (selectedCount === 1) {
      return (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleEditDocument}
            startIcon={<EditIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: "rgba(255, 255, 255, 0.23)",
              color: "#ffffff",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeleteDocuments}
            startIcon={<DeleteIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: "rgba(231, 76, 60, 0.5)",
              color: "#e74c3c",
              "&:hover": {
                borderColor: "#e74c3c",
                backgroundColor: "rgba(231, 76, 60, 0.1)",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      );
    } else {
      return (
        <Button
          variant="outlined"
          onClick={handleDeleteDocuments}
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            borderColor: "rgba(231, 76, 60, 0.5)",
            color: "#e74c3c",
            "&:hover": {
              borderColor: "#e74c3c",
              backgroundColor: "rgba(231, 76, 60, 0.1)",
            },
          }}
        >
          Delete ({selectedCount})
        </Button>
      );
    }
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            {activeCollection}
          </Typography>

          <IconButton
            onClick={() => setIsPermissionsDrawer(true)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 2,
              color: "rgba(255, 255, 255, 0.7)",
              ml: 1,
              width: 40,
              height: 40,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
              },
            }}
          >
            <LockIcon fontSize="medium" />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "Center", ml: "auto" }}>
          {renderActionButtons()}

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
        onRowSelectionModelChange={handleRowSelectionChange}
        sx={{
          flex: 1,
          borderRadius: 2,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
        getRowId={(row) => row._id}
      />

      {isAddNewDocument ? (
        <AddDocumentDrawer
          isAddNewDocument={isAddNewDocument}
          setIsAddNewDocument={setIsAddNewDocument}
          fields={fields}
          collection={activeCollection}
          setDocuments={setDocuments}
        />
      ) : null}

      {isEditDocument ? (
        <EditDocumentDrawer
          isEditDocument={isEditDocument}
          setIsEditDocument={setIsEditDocument}
          activeCollection={activeCollection}
          selectedDocument={
            documents.find((d) => d._id === selectedRows[0]) as Document
          }
          setDocuments={setDocuments}
        />
      ) : null}

      {isPermissionsDrawer ? (
        <CollectionPermissionsDrawer
          isOpen={isPermissionsDrawer}
          onClose={() => setIsPermissionsDrawer(false)}
          collection={activeCollection}
        />
      ) : null}
    </Box>
  );
}
