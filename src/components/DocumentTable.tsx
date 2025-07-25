import { useMemo } from 'react';
import DocumentRow from './DocumentRow';
import Actions from './Actions';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox
} from '@mui/material';

import type { DocumentTableProps } from '../types/types';

const DocumentTable = ({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onSelectAll,
  activeCollection
}: DocumentTableProps) => {
  const headers = useMemo(() => {
    const allKeys = new Set<string>();
    for (let doc of documents) {
      for (let key of Object.keys(doc)) allKeys.add(key);
    };
    return Array.from(allKeys);
  }, [documents]);

  const allSelected = documents.length > 0 && documents.every(({id}) => {
    return selectedDocuments.includes(id);
  });

  if (documents.length > 0) {
    return (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={allSelected}
                    onChange={() => onSelectAll(!allSelected)}
                  ></Checkbox>
                </TableCell>
                {headers.map(header => {
                  return <TableCell key={header}>{header}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map(doc => {
                return (
                  <DocumentRow
                    key={doc.id}
                    doc={doc}
                    headers={headers}
                    isSelected={selectedDocuments.includes(doc.id)}
                    onDocumentSelect={onDocumentSelect}
                  ></DocumentRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Actions
          activeCollection={activeCollection}
          selectedDocuments={selectedDocuments}
        ></Actions>
      </>
    );
  } else {
    return <p>No documents found in this collection</p>
  }

};

export default DocumentTable;
