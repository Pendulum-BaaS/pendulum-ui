import { useState } from 'react';
import AddDocDrawer from './AddDocDrawer';
import EditDrawer from './EditDrawer';
import { Button } from '@mui/material';
import type { ActionsProps } from '../types/types';

const Actions = ({ activeCollection, selectedDocuments }: ActionsProps) => {
  const [addDocDrawer, setAddDocDrawer] = useState(false);
  const [editDrawer, setEditDrawer] = useState(false);

  const toggleDrawer = (type: 'add' | 'edit') => {
    return (newOpen: boolean) => {
      if (type === 'add') {
        setAddDocDrawer(newOpen);
      } else {
        setEditDrawer(newOpen);
      };
    };
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedDocuments.length} ` +
      `document${selectedDocuments.length === 1 ? '' : 's'}?`
    );

    if (confirmed) console.log('Deleting'); // add functionality
  };

  return (
    <>
      <h3>Actions</h3>
      <Button variant='outlined' onClick={() => setAddDocDrawer(true)}>
        Add New Documents
      </Button>
      <AddDocDrawer
        isOpen={addDocDrawer}
        toggleDrawer={toggleDrawer('add')}
      ></AddDocDrawer>
      <Button
        variant='outlined'
        disabled={selectedDocuments.length === 0}
        onClick={() => setEditDrawer(true)}
      >
        Edit Selected
      </Button>
      <EditDrawer
        isOpen={editDrawer}
        toggleDrawer={toggleDrawer('edit')}
        activeCollection={activeCollection}
        selectedDocuments={selectedDocuments}
      ></EditDrawer>
      <Button
        variant='outlined'
        disabled={selectedDocuments.length === 0}
        onClick={handleDelete}
      >
        Delete Selected
      </Button>
    </>
  );
};

export default Actions;
