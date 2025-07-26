import type { PendulumClient } from '../../../pendulum-sdk/src/pendulumClient';

export interface Document { id: string, [key: string]: any };

export interface Collection { name: string, documents: Document[] };

export interface DocumentTableProps {
  documents: Document[],
  selectedDocuments: string[],
  onDocumentSelect: (documentId: string, selected: boolean) => void,
  onSelectAll: (selected: boolean) => void,
  activeCollection: string
};

export interface NavigationBarProps {
  collections: Collection[],
  onCollectionChange: (collectionName: string) => void
};

export interface DocumentRowProps {
  doc: Document,
  headers: string[];
  isSelected: boolean;
  onDocumentSelect: (documentId: string, selected: boolean) => void;
};

export interface ActionsProps {
  activeCollection: string,
  selectedDocuments: string[]
};

export interface AddDrawerProps {
  isOpen: boolean,
  toggleDrawer: (newOpen: boolean) => void
};

export interface EditDrawerProps extends AddDrawerProps {
  activeCollection: string,
  selectedDocuments: string[]
};

export interface PendulumContextType {
  client: PendulumClient,
  isConnected: boolean
};

export type MutationOperation =
  'insert' |
  'updateOne' |
  'updateSome' |
  'updateAll' |
  'removeOne' |
  'removeSome' |
  'removeAll';
