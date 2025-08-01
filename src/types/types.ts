export interface Document {
  id: string;
  [key: string]: any;
}

export interface Collection {
  name: string;
  documents: Document[];
}

export type LogData = {
  id: string;
  timestamp: string;
  method: string;
  url: string;
  status: string;
  duration: string;
  userAgent: string;
  ip: string;
  userId: string;
};

interface Log {
  type: "log";
  data: Omit<LogData, "id">;
}

interface LogConnection {
  type: "connected";
}

export type LogEvent = Log | LogConnection;

export interface CollectionPermissions {
  create: string[];
  read: string[];
  update: string[];
  delete: string[];
}

export interface EditPermissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;
}
