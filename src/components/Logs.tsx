import { useContext, useState } from "react";
import { LogsContext } from "../contexts/LogsProvider";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box, Chip, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "#2196f3";
    case "POST":
      return "#4caf50";
    case "PUT":
      return "#ff9800";
    case "PATCH":
      return "#9c27b0";
    case "DELETE":
      return "#f44336";
    default:
      return "#9e9e9e";
  }
};

const getStatusColor = (status: string) => {
  const code = parseInt(status);
  if (code >= 200 && code < 300) return "#4caf50";
  if (code >= 300 && code < 400) return "#f39c12";
  if (code >= 400 && code < 500) return "#f44336";
  if (code >= 500) return "#9c27b0";
  return "rgba(255, 255, 255, 0.7)";
};

const LOG_COLUMNS: GridColDef[] = [
  {
    field: "timestamp",
    headerName: "Timestamp",
    flex: 1,
    minWidth: 240,
    renderCell: (params: GridRenderCellParams) => (
      <span
        style={{
          fontSize: "0.875rem",
          color: "#ffffff",
          fontWeight: 400,
        }}
      >
        {new Date(params.value).toUTCString()}
      </span>
    ),
  },
  {
    field: "method",
    headerName: "Method",
    flex: 0.6,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: getMethodColor(params.value),
            border: "1px solid rgba(255, 255, 255, 0.23)",
            fontWeight: 500,
            fontSize: "0.75rem",
            height: 24,
            "& .MuiChip-label": {
              px: 1.5,
            },
          }}
        />
      );
    },
  },
  {
    field: "url",
    headerName: "URL",
    flex: 2,
    minWidth: 250,
    renderCell: (params: GridRenderCellParams) => (
      <span
        style={{
          fontSize: "0.875rem",
          color: "#ffffff",
          fontWeight: 400,
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params: GridRenderCellParams) => (
      <span
        style={{
          color: getStatusColor(params.value),
          fontWeight: 500,
          fontSize: "0.875rem",
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "duration",
    headerName: "Duration",
    flex: 0.7,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => (
      <span
        style={{
          fontSize: "0.875rem",
          color: "#ffffff",
          fontWeight: 400,
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "userAgent",
    headerName: "User-Agent",
    flex: 1.5,
    minWidth: 180,
    renderCell: (params: GridRenderCellParams) => (
      <span
        style={{
          fontSize: "0.875rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "rgba(255, 255, 255, 0.8)",
          fontWeight: 400,
        }}
        title={params.value}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "ip",
    headerName: "IP Address",
    flex: 1,
    minWidth: 120,
    renderCell: (params: GridRenderCellParams) => (
      <span
        style={{
          fontSize: "0.875rem",
          color: "#ffffff",
          fontWeight: 400,
        }}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 0.8,
    minWidth: 110,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          fontSize: "0.75rem",
          height: 24,
          backgroundColor:
            params.value === "anonymous"
              ? "rgba(158, 158, 158, 0.1)"
              : "rgba(33, 150, 243, 0.1)",
          border:
            params.value === "anonymous"
              ? "1px solid rgba(158, 158, 158, 0.3)"
              : "1px solid rgba(33, 150, 243, 0.3)",
          color: params.value === "anonymous" ? "#9e9e9e" : "#2196f3",
          fontWeight: 500,
          "& .MuiChip-label": {
            px: 1.5,
          },
        }}
      />
    ),
  },
];

export default function Logs() {
  const paginationModel = { page: 0, pageSize: 20 };
  const { logEntries, isConnected, clearLogs } = useContext(LogsContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    if (newSelection.type === "include") {
      setSelectedRows(
        logEntries
          .filter((log) => newSelection.ids.has(log.id))
          .map((log) => log.id),
      );
    } else {
      setSelectedRows(logEntries.map((log) => log.id));
    }
  };

  const downloadSelectedAsCSV = () => {
    const selectedLogs = logEntries.filter((log) =>
      selectedRows.includes(log.id),
    );

    if (selectedLogs.length === 0) return;

    const headers = [
      "Timestamp",
      "Method",
      "URL",
      "Status",
      "Duration",
      "User-Agent",
      "IP Address",
      "User ID",
    ];

    const csvRows = selectedLogs.map((log) => [
      log.timestamp,
      log.method,
      `"${log.url}"`,
      log.status,
      log.duration,
      `"${log.userAgent}"`,
      log.ip,
      log.userId,
    ]);

    const csvContent = [headers, ...csvRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `request-logs-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          }}
        >
          Request Logs
        </Typography>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
          {selectedRows.length > 0 ? (
            <Button
              variant="outlined"
              onClick={downloadSelectedAsCSV}
              startIcon={<DownloadIcon />}
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
              Download ({selectedRows.length})
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={clearLogs}
              startIcon={<ClearIcon />}
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
              Clear Logs
            </Button>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: isConnected ? "#4caf50" : "#f44336",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DataGrid
        rows={logEntries}
        columns={LOG_COLUMNS}
        initialState={{ pagination: { paginationModel } }}
        checkboxSelection
        pageSizeOptions={[20, 50, 100]}
        onRowSelectionModelChange={handleRowSelectionChange}
        sx={{
          flex: 1,
          borderRadius: 2,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
        getRowId={(row) => row.id}
        density="compact"
      />
    </Box>
  );
}
