import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Document } from "../types/types";
import { Box, Button } from "@mui/material";
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
        margin: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h2>{collection}</h2>
        <Button
          variant="contained"
          onClick={() => setIsAddNewDocument(true)}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            margin: 2,
            marginLeft: "auto",
            width: "auto",
          }}
        >
          <AddIcon />
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
          border: 1,
          flex: 1,
          borderStyle: "solid",
          borderRadius: 4,
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
