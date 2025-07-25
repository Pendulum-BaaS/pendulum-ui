import { useState } from 'react';
import { Drawer, Button, TextField } from '@mui/material';
import type { AddDrawerProps } from '../types/types';

const AddCollectionDrawer = ({ isOpen, toggleDrawer }: AddDrawerProps) => {
  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = () => toggleDrawer(false); // add functionality
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };

  return (
    <Drawer open={isOpen} anchor={'right'}>
      <h2>Add New Collection</h2>
      <Button onClick={() => toggleDrawer(false)}>X</Button>
      <form onSubmit={handleSubmit}>
        <label htmlFor='newCollection'>Name</label>
        <TextField
          id='newCollection'
          value={collectionName}
          onChange={handleChange}
        ></TextField>
        <Button variant='outlined' onClick={handleSubmit}>
          Save Collection
        </Button>
      </form>
    </Drawer>
  );
};

export default AddCollectionDrawer;
