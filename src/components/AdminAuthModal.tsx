import { useState, useContext } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { PendulumContext } from '../contexts/PendulumProvider';
import { pendulumGradient } from '../utils/gradients';

interface AdminAuthModalProps {
  open: boolean;
  onAuthSuccess: () => void;
}

const AdminAuthModal = ({ open, onAuthSuccess }: AdminAuthModalProps) => {
  const { client } = useContext(PendulumContext);
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminKey.trim()) {
      setError('Please enter your admin key');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await client.validateAdminKey(adminKey.trim());
      
      if (result.success) {
        client.setAdminKey(adminKey.trim());
        // Modal will close automatically when client.isAuthenticated() becomes true
        setAdminKey('');
        onAuthSuccess?.(); // callback to parent to update auth state
      } else {
        setError(result.error || 'Invalid admin key');
      }
    } catch (err) {
      setError('Failed to validate admin key. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminKey(event.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          p: 4,
          outline: 'none',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              background: pendulumGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Admin Access Required
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '400px',
              mx: 'auto',
            }}
          >
            Enter your admin API key to access the Pendulum dashboard
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Admin Token"
              value={adminKey}
              onChange={handleKeyChange}
              disabled={loading}
              placeholder="Paste your admin key here..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                  fontSize: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6a4c93',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#6a4c93',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: '#ffffff',
                },
              }}
            />
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: '#ff6b6b',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                '& .MuiAlert-icon': {
                  color: '#ff6b6b',
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !adminKey.trim()}
            sx={{
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              background: loading ? 'rgba(106, 76, 147, 0.5)' : pendulumGradient,
              '&:hover': {
                background: loading ? 'rgba(106, 76, 147, 0.5)' : 'linear-gradient(45deg, #4a3269 30%, #6a4c93 90%)',
              },
              '&:disabled': {
                background: 'rgba(106, 76, 147, 0.3)',
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} sx={{ color: '#ffffff' }} />
                Validating Token...
              </Box>
            ) : (
              'Access Dashboard'
            )}
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '12px',
            }}
          >
            Your admin API key is provided during deployment.<br />
            Run 'pendulum deploy' to see your admin key.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminAuthModal;
