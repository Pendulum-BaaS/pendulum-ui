import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Document } from "../types/types";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddDocumentDrawer from "./AddDocumentDrawer";

interface DataTableProps {
  collection: string;
  columns: GridColDef[];
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

export default function DataTable({
  collection,
  columns,
  documents,
  setDocuments,
}: DataTableProps) {
  const [isAddNewDocument, setIsAddNewDocument] = useState(false);
  const paginationModel = { page: 0, pageSize: 10 };

  const fields = columns.map((col) => col.field);

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
          {collection}
        </Typography>
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
      </Box>

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
        collection={collection}
        setDocuments={setDocuments}
      />
    </Box>
  );
}
