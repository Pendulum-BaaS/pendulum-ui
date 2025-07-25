import { useState, useEffect } from 'react';
import { sampleCollections } from '../sample_data/sample_data';
import { Drawer, Button, TextField } from '@mui/material';
import type { EditDrawerProps, Collection } from '../types/types';

const EditDrawer = ({
  isOpen,
  toggleDrawer,
  activeCollection,
  selectedDocuments
}: EditDrawerProps) => {
  const [textFieldContent, setTextFieldContent] = useState('{\n\n}');

  useEffect(() => {
    if (selectedDocuments.length === 1) {
      const selectedDocId = selectedDocuments[0];
      const currentCollection = sampleCollections.find(({name}) => {
        return name === activeCollection;
      }) as Collection;

      const selectedDoc = currentCollection['documents'].find(({id}) => {
        return id === selectedDocId;
      });

      setTextFieldContent(JSON.stringify(selectedDoc));
    } else {
      setTextFieldContent('{\n\n}');
    }
  }, [selectedDocuments]);

  const handleSubmit = () => toggleDrawer(false); // add functionality
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldContent(event.target.value);
  };

  return (
    <Drawer open={isOpen} anchor={'right'}>
      <h2>Edit Documents</h2>
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

export default EditDrawer;
