import { useContext, useState, useEffect } from "react";
import { PendulumContext } from "../contexts/PendulumProvider";
import { type User } from "../types/types";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordCell: React.FC<{ value: string }> = ({ value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span
        style={{
          fontSize: "0.875rem",
          color: "#ffffff",
          fontWeight: 400,
          fontFamily: showPassword ? "inherit" : "monospace",
        }}
      >
        {showPassword ? value : "••••••••"}
      </span>
      <IconButton
        onClick={togglePasswordVisibility}
        size="small"
        sx={{
          color: "#ffffff",
          padding: "2px",
          opacity: 0.7,
          "&:hover": {
            opacity: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {showPassword ? (
          <VisibilityOff fontSize="small" />
        ) : (
          <Visibility fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
};

const USER_COLUMNS: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
    minWidth: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Box
          sx={{
            backgroundColor: "rgba(106, 76, 147, 0.2)",
            border: "1px solid rgba(106, 76, 147, 0.4)",
            borderRadius: "12px",
            px: 0.5,
            py: 0.5,
            fontSize: "0.75rem",
            fontFamily: "monospace",
            color: "#ffffff",
            display: "inline-block",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.7,
          }}
          title={params.value}
        >
          {params.value}
        </Box>
      </Box>
    ),
  },
  {
    field: "username",
    headerName: "Username",
    flex: 0.6,
    minWidth: 160,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <span
          style={{
            fontSize: "0.875rem",
            color: "#ffffff",
            fontWeight: 400,
          }}
        >
          {params.value}
        </span>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    minWidth: 200,
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
    field: "password",
    headerName: "Password",
    flex: 0.5,
    minWidth: 180, // Increased to accommodate the eye icon
    renderCell: (params: GridRenderCellParams) => (
      <PasswordCell value={params.value} />
    ),
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.7,
    minWidth: 60,
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
    field: "createdAt",
    headerName: "Created At",
    flex: 1.5,
    minWidth: 180,
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
    field: "updatedAt",
    headerName: "Last Updated",
    flex: 1,
    minWidth: 180,
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
];
export default function Users() {
  const paginationModel = { page: 0, pageSize: 20 };
  const [users, setUsers] = useState<User[]>([]);
  const { client } = useContext(PendulumContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleRowSelectionChange = (newSelection: GridRowSelectionModel) => {
    if (newSelection.type === "include") {
      setSelectedRows(
        users
          .filter((user) => newSelection.ids.has(user._id))
          .map((user) => user._id),
      );
    } else {
      setSelectedRows(users.map((user) => user._id));
    }
  };

  const handleDeleteUsers = async () => {
    try {
      const result = await client.db.removeSome("users", selectedRows);
      if (result.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedRows.includes(user._id)),
        );
        setSelectedRows([]);
      } else {
        throw new Error("Unable to delete users");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await client.db.getAll("users");
        if (result.success) {
          setUsers(result.data);
        } else {
          throw new Error("Problem fetching data from users collection");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [client]);

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
          Users
        </Typography>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleDeleteUsers}
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
            Delete ({selectedRows.length})
          </Button>
        </Box>
      </Box>

      <DataGrid
        rows={users}
        columns={USER_COLUMNS}
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
        getRowId={(row) => row._id}
        density="compact"
      />
    </Box>
  );
}
