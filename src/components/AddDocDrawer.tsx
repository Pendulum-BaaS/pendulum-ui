import { useState } from 'react';
import { Drawer, Button, TextField } from '@mui/material';
import type { AddDocDrawerProps } from '../types/types';

const AddDocDrawer = ({ isOpen, toggleDrawer }: AddDocDrawerProps) => {
  const [textFieldContent, setTextFieldContent] = useState('[\n  {\n\n  }\n]');

  const handleSubmit = () => toggleDrawer(false); // add functionality
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldContent(event.target.value);
  };

  return (
    <Drawer open={isOpen} anchor={'right'}>
      <h2>Add New Documents</h2>
      <Button onClick={() => toggleDrawer(false)}>X</Button>
      <form onSubmit={handleSubmit}>
        <label htmlFor='documentContent'>Document Content (JSON)</label>
        <TextField
          id='documentContent'
          value={textFieldContent}
          onChange={handleChange}
          multiline
        ></TextField>
        <Button variant='outlined' onClick={handleSubmit}>
          Save Documents
        </Button>
      </form>
    </Drawer>
  );
};

export default AddDocDrawer;
