import { TableRow, TableCell, Checkbox } from '@mui/material';
import type { DocumentRowProps } from '../types/types';

const DocumentRow = ({
  doc,
  headers,
  isSelected,
  onDocumentSelect
}: DocumentRowProps) => {
  return (
    <TableRow key={doc.id}>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onChange={() => onDocumentSelect(doc.id, !isSelected)}
        />
      </TableCell>
      {headers.map(header => {
        return <TableCell key={header}>{doc[header]}</TableCell>
      })}
    </TableRow>
  );
};

export default DocumentRow;
