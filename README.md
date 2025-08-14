# Pendulum UI
React-based admin dashboard for Pendulum BaaS - providing real-time management of data, users, permissions, and system monitoring.

# Overview
Pendulum UI is the administrative interface for Pendulum BaaS, offering:

- Data Management - Browse, create, edit, and delete documents across collections
- User Management - View registered users and manage roles
- Permission Control - Configure collection-level CRUD permissions
- Real-time Monitoring - Live system logs and activity tracking

## Quick Start
### Prerequisites

- Node.js 18+
- Running Pendulum backend (via `pendulum dev` or deployed)

### Development
```bash
npm install
npx pendulum dev
```

The dashboard will be available at http://localhost:3000/admin

### Production Build
```bash
npm run build
```

Generates static files in dist/ directory for deployment.

## Features
### Data Management

- Collection Browser - Navigate between MongoDB collections
- Document Editor - JSON-based document creation and editing
- Bulk Operations - Select and delete multiple documents
- Real-time Updates - Automatic refresh when data changes

### Permission Management

- Role-based Access - Configure permissions for `admin`, `user`, and `public` roles
- CRUD Controls - Granular create, read, update, and delete permissions per collection
- Permission Templates - Quick setup with common patterns (public, user-only, admin-only, read-only)

### System Monitoring

- Live Logs - Real-time server request logs via Server-Sent Events
- User Activity - Track API usage, response times, and user actions
- Export Functionality - Download logs as CSV for analysis

## Authentication
The dashboard requires admin authentication:

### Development Mode

- No authentication required (auto-authenticated)
- Full access to all features

## Production Mode

- Requires admin API key (provided during deployment)
- Key validation against backend `/auth/admin/validate` endpoint

## Configuration
### Environment Variables
```env
VITE_API_URL=http://localhost:3000        # Backend API URL
VITE_EVENTS_URL=http://localhost:8080     # Events service URL
```

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

## Component Architecture
App.tsx
├── Header.tsx                     # Top navigation
├── Sidebar Components/
│   ├── ExpandedSidebar.tsx        # Full navigation menu
│   └── CollapsedSidebar.tsx       # Minimized navigation
├── Pages/
│   ├── Data.tsx                   # Data management interface
│   ├── Users.tsx                  # User management
│   └── Logs.tsx                   # System monitoring
└── Drawers/
    ├── AddDocumentDrawer.tsx      # Document creation
    ├── EditDocumentDrawer.tsx     # Document editing
    └── EditPermissionsDrawer.tsx  # Permission management

## API Integration
The UI connects to Pendulum backend services:

### Data Operations
```bash
# Get collections
GET /pendulum/collections

# CRUD operations
GET /pendulum/api?collection=users
POST /pendulum/api
PATCH /pendulum/api/:id
DELETE /pendulum/api/:id
```

### Real-time Events
```bash
# SSE connections
GET /pendulum-events/events      # Database changes
GET /pendulum/logs               # Server logs
```

### Permissions
```bash
# Collection permissions
GET /pendulum/permissions/:collection/permissions
PUT /pendulum/permissions/:collection/permissions
```

## Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint checking
```

## Dependencies
### Core Libraries

- React 19 - UI framework
- TypeScript - Type safety
- Vite - Build tool and dev server
- React Router - Client-side routing

### UI Components

- Material-UI (MUI) - Component library
- MUI X Data Grid - Advanced data tables
- Material Icons - Icon system

### Data & State

- @pendulum-baas/sdk - Backend integration
- React Context - State management
- Server-Sent Events - Real-time updates

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires modern browser features:

- ES6+ JavaScript
- CSS Grid & Flexbox
- Server-Sent Events
- Local Storage

## Deployment Integrated with Backend
The UI is automatically included when using `pendulum deploy`:

- Built assets served from `/admin` route
- Automatic proxy configuration
- Admin authentication integration

## Security Features

- CSRF Protection - Origin validation
- XSS Prevention - Content Security Policy headers
- Admin Authentication - API key validation
- Secure Defaults - No sensitive data in localStorage

## Real-time Features
The dashboard provides live updates for:

- Document changes - Automatic table refresh
- User registrations - Live user list updates
- System logs - Streaming server activity
- Permission changes - Immediate effect validation
