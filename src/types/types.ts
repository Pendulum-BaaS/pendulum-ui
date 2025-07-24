export interface Document { id: string, [key: string]: any };

export interface Collection { name: string, documents: Document[] };

export interface DocumentTableProps {
  documents: Document[],
  selectedDocuments: string[],
  onDocumentSelect: (documentId: string, selected: boolean) => void,
  onSelectAll: (selected: boolean) => void
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
}
