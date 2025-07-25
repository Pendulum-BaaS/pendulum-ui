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

export interface AddDocDrawerProps {
  isOpen: boolean,
  toggleDrawer: (newOpen: boolean) => void
};

export interface EditDrawerProps extends AddDocDrawerProps {
  activeCollection: string,
  selectedDocuments: string[]
};
