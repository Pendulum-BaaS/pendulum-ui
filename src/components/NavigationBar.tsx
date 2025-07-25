import { useState } from 'react';
import { List, Button } from '@mui/material';
import AddCollectionDrawer from './AddCollectionDrawer';
import type { NavigationBarProps } from '../types/types';

const NavigationBar = ({
  collections,
  onCollectionChange
}: NavigationBarProps) => {
  const [addCollectionDrawer, setAddCollectionDrawer] = useState(false);

  const handleAddCollection = () => toggleDrawer(true);
  const toggleDrawer = (newOpen: boolean) => setAddCollectionDrawer(newOpen);

  return (
    <nav>
      <h1>Document Collections</h1>
      <List>
        {collections.map(collection => {
          return (
            <Button
              key={collection.name}
              onClick={() => onCollectionChange(collection.name)}
            >
              {collection.name}
            </Button>
          )
        })}
      </List>
      <Button variant='outlined' onClick={handleAddCollection}>
        Add New Collection
      </Button>
      <AddCollectionDrawer
        isOpen={addCollectionDrawer}
        toggleDrawer={toggleDrawer}
      ></AddCollectionDrawer>
    </nav>
  );
};

export default NavigationBar;
