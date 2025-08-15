# Pendulum UI
Pendulum UI is the administrative control center for your Pendulum backend. Monitor database changes in real-time, manage user permissions, and track system activity through an intuitive web interface.

Key Benefits:

- Real-time monitoring - Watch database changes and API activity as they happen
- Visual data management - Browse and edit documents with a user-friendly interface
- Permission control - Configure collection access with simple role-based controls
- Zero setup - Automatically included with Pendulum Core, no separate installation
- Production ready - Admin authentication and secure access controls

## Quick Start
### Prerequisites

- Node.js 18+
- Running Pendulum backend (via `pendulum dev` or deployed)

### Access the Dashboard
During Development:
```bash
npx pendulum dev
# Dashboard available at http://localhost:3000/admin
```

In Production:
```bash
# Dashboard deployed automatically with pendulum deploy
# Access via your deployed admin URL with API key
```

## Authentication

- **Development mode** - No authentication required (auto-authenticated)
- **Production mode** - Requires admin API key (provided during deployment)

## Core Features
### Data Management

- **Collection Browser** - Navigate between MongoDB collections
- **Document Editor** - JSON-based document creation and editing
- **Bulk Operations** - Select and delete multiple documents
- **Real-time Updates** - Automatic refresh when data changes

### Permission Management

- **Role-based Access** - Configure permissions for `admin`, `user`, and `public` roles
- **CRUD Controls** - Granular create, read, update, and delete permissions per collection
- **Permission Templates** - Quick setup with common patterns (public, user access, admin only, read only)

### System Monitoring

- **Live Logs** - Real-time server request logs via Server-Sent Events
- **User Activity** - Track API usage, response times, and user actions
- **Export Functionality** - Download logs as CSV for analysis

## Configuration
### Development Environment
Default configuration works automatically with `pendulum dev`:
```bash
VITE_API_URL=http://localhost:3000      # Backend API URL
VITE_EVENTS_URL=http://localhost:8080   # Events service URL
```

### Production Environment
Environment variables are automatically configured during deployment.

### Vite Configuration
The dashboard includes proxy configuration for local development:
```typescript
// vite.config.ts
export default defineConfig({
  base: "/admin/",
  server: {
    proxy: {
      "/pendulum": "http://localhost:3000",
      "/pendulum-events": "http://localhost:8080"
    }
  }
});
```

## API Integration
The dashboard connects to Pendulum backend services:

### Data Operations
```bash
# CRUD Operations
GET    /pendulum/collections                    # List all collections
GET    /pendulum/api?collection=<name>          # Get documents
POST   /pendulum/api?collection=<name>          # Create documents
PATCH  /pendulum/api/:id?collection=<name>     # Update document
DELETE /pendulum/api/:id?collection=<name>     # Delete document
```

### Real-time Events
```bash
# SSE Connections
GET /pendulum-events/events     # Database changes
GET /pendulum/logs              # Server logs
```

### Permissions
```bash
# Collection Permissions
GET /pendulum/permissions/:collection/permissions  # Get permissions
PUT /pendulum/permissions/:collection/permissions  # Update permissions
```

## Deployment Integrated with Backend
The UI is automatically included when using `pendulum deploy`:

- Built assets served from `/admin` route
- Automatic proxy configuration
- Admin authentication integration

## Real-time Features
The dashboard provides live updates for:

- **Document changes** - Automatic table refresh
- **User registrations** - Live user list updates
- **System logs** - Streaming server activity
- **Permission changes** - Immediate peremission validation

## Dependencies Downloaded with `npm install`
- React 19 - UI framework
- TypeScript - Type safety
- Material-UI (MUI) - Component library
- MUI X Data Grid - Advanced data tables
- Vite - Build tool and dev server
- @pendulum-baas/sdk - Backend integration
