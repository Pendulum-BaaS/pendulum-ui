import { useState, useEffect, useContext } from 'react';
import {
  Drawer,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PendulumContext } from '../contexts/PendulumProvider';
import { pendulumGradient } from '../utils/gradients';

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

const ROLES = ['admin', 'user', 'public'];
const ACTIONS = [
  { key: 'create', label: 'Create' },
  { key: 'read', label: 'Read' },
  { key: 'update', label: 'Update' },
  { key: 'delete', label: 'Delete' }
];

const EditPermissionsDrawer = ({ isOpen, onClose, collectionName }: EditPermissionsDrawerProps) => {
  const { client } = useContext(PendulumContext);
  const [permissions, setPermissions] = useState<CollectionPermissions | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load current permissions when drawer opens
  useEffect(() => {
    if (isOpen && collectionName) {
      loadPermissions();
    }
  }, [isOpen, collectionName]);

  const loadPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Add this method to your SDK
      const response = await client.getCollectionPermissions(collectionName);
      setPermissions(response.data.permissions);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (action: string, role: string, checked: boolean) => {
    if (!permissions) return;

    setPermissions(prev => {
      if (!prev) return prev;
      
      const newPermissions = { ...prev };
      const actionPermissions = [...newPermissions[action as keyof CollectionPermissions]];
      
      if (checked) {
        if (!actionPermissions.includes(role)) {
          actionPermissions.push(role);
        }
      } else {
        const index = actionPermissions.indexOf(role);
        if (index > -1) {
          actionPermissions.splice(index, 1);
        }
      }
      
      newPermissions[action as keyof CollectionPermissions] = actionPermissions;
      return newPermissions;
    });
  };

  const handleSave = async () => {
    if (!permissions) return;
    
    setSaving(true);
    setError(null);
    try {
      // Add this method to your SDK
      await client.updateCollectionPermissions(collectionName, permissions);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to update permissions');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setPermissions(null);
    setError(null);
    onClose();
  };

  return (
    <Drawer 
      open={isOpen} 
      anchor="right"
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400, md: 450 },
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: 600 }}>
            Edit Permissions
          </Typography>
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

        <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body2"
            sx={{ 
              color: "rgba(255, 255, 255, 0.7)", 
              mb: 3,
              background: pendulumGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600,
            }}
          >
            Collection: {collectionName}
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress sx={{ color: '#ffffff' }} />
            </Box>
          ) : permissions ? (
            <>
              {/* Permissions Grid */}
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                {ACTIONS.map((action) => (
                  <Box key={action.key} sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#ffffff', 
                        fontWeight: 600, 
                        mb: 1,
                        textTransform: 'capitalize'
                      }}
                    >
                      {action.label}
                    </Typography>
                    <FormGroup>
                      {ROLES.map((role) => (
                        <FormControlLabel
                          key={role}
                          control={
                            <Checkbox
                              checked={permissions[action.key as keyof CollectionPermissions]?.includes(role) || false}
                              onChange={(e) => handlePermissionChange(action.key, role, e.target.checked)}
                              sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&.Mui-checked': {
                                  color: '#6a4c93',
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', textTransform: 'capitalize' }}>
                              {role}
                            </Typography>
                          }
                        />
                      ))}
                    </FormGroup>
                    {action.key !== ACTIONS[ACTIONS.length - 1].key && (
                      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mt: 2 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </>
          ) : null}
        </Box>

        {/* Action Buttons */}
        {permissions && !loading && (
          <>
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
                onClick={handleClose}
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
                sx={{ px: 4 }}
              >
                {saving ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Save Changes'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default EditPermissionsDrawer;
