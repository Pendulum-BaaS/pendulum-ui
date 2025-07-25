import { List, Button } from '@mui/material';
import type { NavigationBarProps } from '../types/types';

const NavigationBar = ({
  collections,
  onCollectionChange
}: NavigationBarProps) => {
  const handleAddCollection = () => console.log('Adding new collection'); // Do we have this route?

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
    </nav>
  );
};

export default NavigationBar;
