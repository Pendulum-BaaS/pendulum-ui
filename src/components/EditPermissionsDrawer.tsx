import { useState, useEffect, useContext } from "react";
import {
  Drawer,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { PendulumContext } from "../contexts/PendulumProvider";

interface EditPermissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;
}

interface CollectionPermissions {
  create: string[];
  read: string[];
  update: string[];
  delete: string[];
}

const ROLE_HIERARCHY = ["admin", "user", "public"] as const;
const ROLE_LABELS = {
  admin: "Admin",
  user: "User",
  public: "Public",
};

const CRUD_LABELS = {
  create: "Create",
  read: "Read",
  update: "Update",
  delete: "Delete",
};

// Convert array of roles to minimum role level
const getMinimumRole = (roles: string[]): string => {
  if (roles.includes("public")) return "public";
  if (roles.includes("user")) return "user";
  return "admin";
};

// Convert minimum role to array of allowed roles
const rolesToArray = (minRole: string): string[] => {
  const index = ROLE_HIERARCHY.indexOf(minRole as any);
  return ROLE_HIERARCHY.slice(0, index + 1);
};

interface RoleSliderProps {
  action: keyof CollectionPermissions;
  currentRoles: string[];
  onChange: (newRoles: string[]) => void;
}

function RoleSlider({ action, currentRoles, onChange }: RoleSliderProps) {
  const currentMinRole = getMinimumRole(currentRoles);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleRoleClick = (role: string) => {
    const newRoles = rolesToArray(role);
    onChange(newRoles);
  };

  const getSegmentStyle = (_role: string, index: number) => {
    const isSelected = ROLE_HIERARCHY.indexOf(currentMinRole as any) >= index;
    const isHovered =
      hoveredRole && ROLE_HIERARCHY.indexOf(hoveredRole as any) >= index;
    const wouldBeDeselected =
      hoveredRole &&
      isSelected &&
      ROLE_HIERARCHY.indexOf(hoveredRole as any) < index;

    let borderRadius = "0px";
    if (index === 0) borderRadius = "8px 0 0 8px";
    if (index === ROLE_HIERARCHY.length - 1) borderRadius = "0 8px 8px 0";

    return {
      flex: 1,
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.1s ease",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderLeft: index === 0 ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
      borderRadius,
      background: wouldBeDeselected
        ? "rgba(255, 255, 255, 0.1)" // Almost-unselected preview
        : isSelected
          ? isHovered
            ? "#ffed4e"
            : "#ffd700" // Solid yellow instead of gradient
          : isHovered
            ? "rgba(255, 215, 0, 0.2)"
            : "rgba(255, 255, 255, 0.05)",
    };
  };

  const getTextStyle = (_role: string, index: number) => {
    const isSelected = ROLE_HIERARCHY.indexOf(currentMinRole as any) >= index;
    const wouldBeDeselected =
      hoveredRole &&
      isSelected &&
      ROLE_HIERARCHY.indexOf(hoveredRole as any) < index;

    return {
      color: wouldBeDeselected
        ? "rgba(255, 255, 255, 0.5)"
        : isSelected
          ? "#000000"
          : "#ffffff",
      fontWeight: isSelected && !wouldBeDeselected ? "600" : "500",
      fontSize: "14px",
      userSelect: "none" as const,
    };
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: "🔒",
      user: "🫂",
      public: "🌐",
    };
    return icons[role as keyof typeof icons];
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Typography
          sx={{
            color: "#ffffff",
            fontWeight: "600",
            minWidth: "70px",
            fontSize: "13px",
          }}
        >
          {CRUD_LABELS[action]}
        </Typography>
        <Box sx={{ flex: 1, marginLeft: 1.5 }}>
          <Box
            sx={{ display: "flex", borderRadius: "6px", overflow: "hidden" }}
          >
            {ROLE_HIERARCHY.map((role, index) => (
              <Box
                key={role}
                sx={{
                  ...getSegmentStyle(role, index),
                  height: "32px", // Reduced from 40px
                }}
                onClick={() => handleRoleClick(role)}
                onMouseEnter={() => setHoveredRole(role)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <Box
                    component="span"
                    sx={{
                      ...getTextStyle(role, index),
                      fontSize: "12px", // Slightly smaller
                    }}
                  >
                    {getRoleIcon(role)}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      ...getTextStyle(role, index),
                      fontSize: "12px", // Reduced from 14px
                    }}
                  >
                    {ROLE_LABELS[role]}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "11px", // Reduced from 12px
          marginLeft: "85px", // Adjusted for new label width
        }}
      >
        {currentMinRole === "admin" && "Only admins can perform this action"}
        {currentMinRole === "user" &&
          "Admins and users can perform this action"}
        {currentMinRole === "public" && "Everyone can perform this action"}
      </Typography>
    </Box>
  );
}

function PermissionTemplate({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        padding: "4px 10px", // Reduced padding
        borderRadius: "14px", // Slightly smaller
        border: `1px solid ${color}30`,
        backgroundColor: isHovered ? `${color}30` : `${color}20`,
        color: color,
        fontSize: "11px", // Reduced from 12px
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginRight: 0.8, // Reduced margin
        marginBottom: 0.8,
        textTransform: "none",
        minWidth: "auto",
      }}
    >
      {label}
    </Button>
  );
}

export default function EditPermissionsDrawer({
  isOpen,
  onClose,
  collectionName,
}: EditPermissionsDrawerProps) {
  const { client } = useContext(PendulumContext);
  const [permissions, setPermissions] = useState<CollectionPermissions | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch permissions when drawer opens
  useEffect(() => {
    if (isOpen && collectionName) {
      fetchPermissions();
    }
  }, [isOpen, collectionName]);

  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await client.getCollectionPermissions(collectionName);
      if (result.success) {
        setPermissions(result.data.data.permissions);
      } else {
        setError(result.error || "Failed to fetch permissions");
      }
    } catch {
      setError("Failed to fetch permissions");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (
    action: keyof CollectionPermissions,
    newRoles: string[],
  ) => {
    if (!permissions) return;

    setPermissions({
      ...permissions,
      [action]: newRoles,
    });
  };

  const applyTemplate = (
    template: "public" | "user" | "admin" | "readonly",
  ) => {
    const templates = {
      public: {
        create: ["admin", "user", "public"],
        read: ["admin", "user", "public"],
        update: ["admin", "user", "public"],
        delete: ["admin", "user", "public"],
      },
      user: {
        create: ["admin", "user"],
        read: ["admin", "user"],
        update: ["admin", "user"],
        delete: ["admin", "user"],
      },
      admin: {
        create: ["admin"],
        read: ["admin"],
        update: ["admin"],
        delete: ["admin"],
      },
      readonly: {
        create: ["admin"],
        read: ["admin", "user", "public"],
        update: ["admin"],
        delete: ["admin"],
      },
    };

    setPermissions(templates[template]);
  };

  const handleSave = async () => {
    if (!permissions) return;

    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await client.updateCollectionPermissions(
        collectionName,
        permissions,
      );
      if (result.success) {
        setSuccessMessage("Permissions updated successfully");
        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Failed to update permissions");
      }
    } catch {
      setError("Failed to update permissions");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccessMessage(null);
    setPermissions(null);
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
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
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography component="span" sx={{ fontSize: "24px" }}>
              🔐
            </Typography>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#ffffff",
                  margin: 0,
                  fontWeight: "600",
                }}
              >
                {collectionName}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "600",
                  margin: 0,
                  fontSize: "16px",
                }}
              >
                Collection Permissions
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleClose}
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

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            p: 2.5, // Reduced padding
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // Remove scrolling
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 1.5 }}>
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 1.5 }}>
              {successMessage}
            </Alert>
          )}

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CircularProgress sx={{ color: "#ffd700" }} />
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Loading permissions...
              </Typography>
            </Box>
          ) : permissions ? (
            <>
              {/* Permission Templates Section */}
              <Box sx={{ mb: 2.5 }}>
                {" "}
                {/* Reduced margin */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffffff",
                    mb: 1.5, // Reduced margin
                    fontWeight: "600",
                    fontSize: "16px", // Slightly smaller
                  }}
                >
                  Permission Templates
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 1.5, // Reduced margin
                    fontSize: "13px",
                  }}
                >
                  Quick setup with common permission patterns
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <PermissionTemplate
                    label="Public Access"
                    color="#81c784"
                    onClick={() => applyTemplate("public")}
                  />
                  <PermissionTemplate
                    label="User Access"
                    color="#64b5f6"
                    onClick={() => applyTemplate("user")}
                  />
                  <PermissionTemplate
                    label="Admin Only"
                    color="#e57373"
                    onClick={() => applyTemplate("admin")}
                  />
                  <PermissionTemplate
                    label="Read Only"
                    color="#ba68c8"
                    onClick={() => applyTemplate("readonly")}
                  />
                </Box>
              </Box>

              <Divider
                sx={{ borderColor: "rgba(255, 255, 255, 0.12)", mb: 2.5 }}
              />

              {/* CRUD Permissions Section */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffffff",
                    mb: 2, // Reduced margin
                    fontWeight: "600",
                    fontSize: "16px", // Slightly smaller
                  }}
                >
                  Custom Permissions
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    mb: 2, // Reduced margin
                    fontSize: "13px",
                  }}
                >
                  Set minimum role required for each operation. Admin users
                  always have full access.
                </Typography>

                <Box>
                  {(["create", "read", "update", "delete"] as const).map(
                    (action) => (
                      <RoleSlider
                        key={action}
                        action={action}
                        currentRoles={permissions[action]}
                        onChange={(newRoles) =>
                          handlePermissionChange(action, newRoles)
                        }
                      />
                    ),
                  )}
                </Box>
              </Box>
            </>
          ) : null}
        </Box>

        {/* Footer */}
        {permissions && !loading && (
          <>
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />
            <Box
              sx={{
                p: 2.5, // Reduced padding
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                disabled={saving}
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
                onClick={handleSave}
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress size={16} sx={{ color: "#1a1a2e" }} />
                  ) : (
                    <SaveIcon />
                  )
                }
                sx={{ px: 4 }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
