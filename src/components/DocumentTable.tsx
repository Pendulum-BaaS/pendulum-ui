import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Document } from "../types/types";
import { Box } from "@mui/material";

const paginationModel = { page: 0, pageSize: 10 };

interface DataTableProps {
  columns: GridColDef[];
  documents: Document[];
}

export default function DataTable({ columns, documents }: DataTableProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        overflow: "auto",
        margin: 2,
        borderRadius: 4,
        border: 1,
        borderStyle: "solid",
      }}
    >
      <DataGrid
        rows={documents}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{ border: 0, flex: 1 }}
        getRowId={(row) => row._id}
      />
    </Box>
  );
}
