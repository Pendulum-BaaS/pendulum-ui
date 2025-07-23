import { List, Button } from '@mui/material';
import type { NavigationBarProps } from '../types/types';

const NavigationBar = ({
  collections,
  onCollectionChange
}: NavigationBarProps) => {
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
    </nav>
  );
};

export default NavigationBar;
