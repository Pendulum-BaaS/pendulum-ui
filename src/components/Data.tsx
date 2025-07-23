import { useState } from 'react';
import { sampleCollections } from '../sample_data/sample_data';
import NavigationBar from './NavigationBar';

const Data = () => {
  const [activeCollection, setActiveCollection] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleCollectionChange = (collectionName: string) => {
    setActiveCollection(collectionName);
    setSelectedDocuments([]);
  };

  return (
    <>
      <NavigationBar
        collections={sampleCollections}
        onCollectionChange={handleCollectionChange}
      ></NavigationBar>
    </>
  );
};

export default Data;
