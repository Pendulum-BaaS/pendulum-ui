import { useState } from 'react';
import { sampleCollections } from '../sample_data/sample_data';
import NavigationBar from './NavigationBar';
import DocumentTable from './DocumentTable';

const Data = () => {
  const [activeCollection, setActiveCollection] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const selectedQty = selectedDocuments.length;
  const currentCollection = sampleCollections.find(collection => {
    return collection.name === activeCollection;
  });

  const handleCollectionChange = (collectionName: string) => {
    setActiveCollection(collectionName);
    setSelectedDocuments([]);
  };

  const handleDocumentSelect = (documentId: string, selected: boolean) => {
    if (selected) {
      setSelectedDocuments(selectedDocuments.concat(documentId));
    } else {
      setSelectedDocuments(selectedDocuments.filter(doc => {
        return doc !== documentId;
      }));
    };
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected && currentCollection) {
      setSelectedDocuments(currentCollection.documents.map(({id}) => id));
    } else {
      setSelectedDocuments([]);
    };
  };

  return (
    <>
      <NavigationBar
        collections={sampleCollections}
        onCollectionChange={handleCollectionChange}
      ></NavigationBar>
      <h2>{activeCollection}</h2>
      <div>
        {
          selectedQty > 0 ?
          `${selectedQty} document${selectedQty === 1 ? '' : 's'} selected` :
          ''
        }
      </div>
      {
        activeCollection ?
        <DocumentTable
          documents={currentCollection ? currentCollection.documents : []}
          selectedDocuments={selectedDocuments}
          onDocumentSelect={handleDocumentSelect}
          onSelectAll={handleSelectAll}
        ></DocumentTable> :
        ''
      }
    </>
  );
};

export default Data;
