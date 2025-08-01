import type { PendulumClient } from "../../../pendulum-sdk/src/pendulumClient";

export interface Document {
  id: string;
  [key: string]: any;
}

export interface Collection {
  name: string;
  documents: Document[];
}

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

export interface PendulumContextType {
  client: PendulumClient,
  isConnected: boolean
};
