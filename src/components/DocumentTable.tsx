import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Document } from "../types/types";
import { Box } from "@mui/material";

const paginationModel = { page: 0, pageSize: 10 };

interface DataTableProps {
  collection: string;
  columns: GridColDef[];
  documents: Document[];
}

export default function DataTable({
  collection,
  columns,
  documents,
}: DataTableProps) {
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
      <h2>{collection}</h2>
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
    </Box>
  );
}
