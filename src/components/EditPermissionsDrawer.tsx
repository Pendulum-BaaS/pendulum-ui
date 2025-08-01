import { useState, useEffect, createContext, useContext } from "react";
import { PendulumContext } from "../contexts/PendulumProvider";

// Simulated context - replace with your actual PendulumContext
// const PendulumContext = createContext({
//   client: {
//     getCollectionPermissions: async (collectionName: string) => ({
//       success: true,
//       data: {
//         data: {
//           permissions: {
//             create: ['admin', 'user'],
//             read: ['admin', 'user', 'public'],
//             update: ['admin'],
//             delete: ['admin']
//           }
//         }
//       }
//     }),
//     updateCollectionPermissions: async (collectionName: string, permissions: any) => ({
//       success: true
//     })
//   }
// });

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

const USER_ROLES = {
  admin: 'admin',
  user: 'user',
  public: 'public',
} as const;

const ROLE_HIERARCHY = ['admin', 'user', 'public'] as const;
const ROLE_LABELS = {
  admin: 'Admin',
  user: 'User', 
  public: 'Public'
};

const CRUD_LABELS = {
  create: 'Create',
  read: 'Read',
  update: 'Update',
  delete: 'Delete',
};

// Convert array of roles to minimum role level
const getMinimumRole = (roles: string[]): string => {
  if (roles.includes('public')) return 'public';
  if (roles.includes('user')) return 'user';
  return 'admin';
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

  const getSegmentStyle = (role: string, index: number) => {
    const isSelected = ROLE_HIERARCHY.indexOf(currentMinRole as any) >= index;
    const isHovered = hoveredRole && ROLE_HIERARCHY.indexOf(hoveredRole as any) >= index;
    
    let borderRadius = '0px';
    if (index === 0) borderRadius = '8px 0 0 8px';
    if (index === ROLE_HIERARCHY.length - 1) borderRadius = '0 8px 8px 0';

    return {
      flex: 1,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderLeft: index === 0 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
      borderRadius,
      background: isSelected 
        ? (isHovered ? 'linear-gradient(135deg, #ffed4e 0%, #ffd700 100%)' : 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)')
        : (isHovered ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'),
    };
  };

  const getTextStyle = (role: string, index: number) => {
    const isSelected = ROLE_HIERARCHY.indexOf(currentMinRole as any) >= index;
    
    return {
      color: isSelected ? '#000000' : '#ffffff',
      fontWeight: isSelected ? '600' : '500',
      fontSize: '14px',
      userSelect: 'none' as const,
    };
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      admin: '🔒',
      // user: '👥',
      user: '🫂',
      public: '🌐'
    };
    return icons[role as keyof typeof icons];
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ 
          color: '#ffffff', 
          fontWeight: '600',
          minWidth: '80px',
          fontSize: '14px'
        }}>
          {CRUD_LABELS[action]}
        </div>
        <div style={{ flex: 1, marginLeft: '16px' }}>
          <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden' }}>
            {ROLE_HIERARCHY.map((role, index) => (
              <div
                key={role}
                style={getSegmentStyle(role, index)}
                onClick={() => handleRoleClick(role)}
                onMouseEnter={() => setHoveredRole(role)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '16px', ...getTextStyle(role, index) }}>
                    {getRoleIcon(role)}
                  </span>
                  <span style={getTextStyle(role, index)}>
                    {ROLE_LABELS[role]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ 
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '12px',
        marginLeft: '96px'
      }}>
        {currentMinRole === 'admin' && 'Only admins can perform this action'}
        {currentMinRole === 'user' && 'Admins and users can perform this action'}
        {currentMinRole === 'public' && 'Everyone can perform this action'}
      </div>
    </div>
  );
}

function PermissionTemplate({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '6px 12px',
        borderRadius: '16px',
        border: `1px solid ${color}30`,
        backgroundColor: isHovered ? `${color}30` : `${color}20`,
        color: color,
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginRight: '8px',
        marginBottom: '8px',
      }}
    >
      {label}
    </button>
  );
}

export default function EditPermissionsDrawer({
  isOpen,
  onClose,
  collectionName,
}: EditPermissionsDrawerProps) {
  const { client } = useContext(PendulumContext);
  const [permissions, setPermissions] = useState<CollectionPermissions | null>(null);
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
        setError(result.error || 'Failed to fetch permissions');
      }
    } catch (err) {
      setError('Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (action: keyof CollectionPermissions, newRoles: string[]) => {
    if (!permissions) return;
    
    setPermissions({
      ...permissions,
      [action]: newRoles,
    });
  };

  const applyTemplate = (template: 'public' | 'user' | 'admin' | 'readonly') => {
    const templates = {
      public: {
        create: ['admin', 'user', 'public'],
        read: ['admin', 'user', 'public'],
        update: ['admin', 'user', 'public'],
        delete: ['admin', 'user', 'public'],
      },
      user: {
        create: ['admin', 'user'],
        read: ['admin', 'user'],
        update: ['admin', 'user'],
        delete: ['admin', 'user'],
      },
      admin: {
        create: ['admin'],
        read: ['admin'],
        update: ['admin'],
        delete: ['admin'],
      },
      readonly: {
        create: ['admin'],
        read: ['admin', 'user', 'public'],
        update: ['admin'],
        delete: ['admin'],
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
      const result = await client.updateCollectionPermissions(collectionName, permissions);
      if (result.success) {
        setSuccessMessage('Permissions updated successfully');
        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
        }, 2000);
      } else {
        setError(result.error || 'Failed to update permissions');
      }
    } catch (err) {
      setError('Failed to update permissions');
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

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '600px',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#ffd700', fontSize: '24px' }}>🔐</span>
          <div>
            <h2 style={{ 
              color: '#ffffff', 
              fontWeight: '600', 
              margin: 0,
              fontSize: '20px'
            }}>
              Collection Permissions
            </h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              margin: '4px 0 0 0',
              fontSize: '14px'
            }}>
              {collectionName}
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ 
        flex: 1, 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        {error && (
          <div style={{
            marginBottom: '16px',
            padding: '12px 16px',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            color: '#ff6b6b',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        {successMessage && (
          <div style={{
            marginBottom: '16px',
            padding: '12px 16px',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            color: '#69f0ae',
            border: '1px solid rgba(46, 125, 50, 0.3)',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {successMessage}
          </div>
        )}

        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flex: 1 
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 215, 0, 0.3)',
              borderTop: '3px solid #ffd700',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : permissions ? (
          <>
            {/* Permission Templates Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                color: '#ffffff', 
                marginBottom: '16px', 
                fontWeight: '600',
                fontSize: '18px'
              }}>
                Permission Templates
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                Quick setup with common permission patterns
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <PermissionTemplate
                  label="Public Access"
                  color="#81c784"
                  onClick={() => applyTemplate('public')}
                />
                <PermissionTemplate
                  label="User Access"
                  color="#64b5f6"
                  onClick={() => applyTemplate('user')}
                />
                <PermissionTemplate
                  label="Admin Only"
                  color="#e57373"
                  onClick={() => applyTemplate('admin')}
                />
                <PermissionTemplate
                  label="Read Only"
                  color="#ba68c8"
                  onClick={() => applyTemplate('readonly')}
                />
              </div>
            </div>

            <div style={{ 
              height: '1px', 
              backgroundColor: 'rgba(255, 255, 255, 0.12)', 
              marginBottom: '32px' 
            }} />

            {/* CRUD Permissions Section */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                color: '#ffffff', 
                marginBottom: '24px', 
                fontWeight: '600',
                fontSize: '18px'
              }}>
                Custom Permissions
              </h3>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                Set minimum role required for each operation. Admin users always have full access.
              </p>
              
              <div style={{ marginTop: '24px' }}>
                {(['create', 'read', 'update', 'delete'] as const).map((action) => (
                  <RoleSlider
                    key={action}
                    action={action}
                    currentRoles={permissions[action]}
                    onChange={(newRoles) => handlePermissionChange(action, newRoles)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Footer */}
      {permissions && !loading && (
        <div style={{
          padding: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '16px',
        }}>
          <button
            onClick={handleClose}
            disabled={saving}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.23)',
              backgroundColor: 'transparent',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: saving ? 0.6 : 1,
            }}
            onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
            onMouseLeave={(e) => !saving && (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: saving 
                ? 'rgba(255, 215, 0, 0.5)' 
                : 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              color: '#000000',
              fontSize: '14px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => !saving && (e.currentTarget.style.background = 'linear-gradient(135deg, #ffed4e 0%, #ffd700 100%)')}
            onMouseLeave={(e) => !saving && (e.currentTarget.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)')}
          >
            {saving ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(0, 0, 0, 0.3)',
                  borderTop: '2px solid #000000',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Saving...
              </>
            ) : (
              <>
                💾 Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
