import { useState, useEffect } from "react";
import type { PendulumClient } from "../../../pendulum-sdk/src/pendulumClient";
import { type Document } from "../types/types";
import { Box } from "@mui/material";
import CollectionMenu from "./CollectionMenu";
import DocumentTable from "./DocumentTable";
import { type GridColDef } from "@mui/x-data-grid";

function Data({ client }: { client: PendulumClient }) {
  const [collections, setCollections] = useState<string[]>([
    "todos",
    "app-test",
  ]);
  const [activeCollection, setActiveCollection] = useState(collections[0]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const getAllColumns = (documents: Document[]): GridColDef[] => {
    const columns = new Set();

    for (const doc of documents) {
      const keys = Object.keys(doc);
      keys.forEach((key) => columns.add(key));
    }

    return [...columns].map((col) => ({
      field: col as string,
      headerName: col as string,
      width: 200,
    }));
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await client.db.getAll(activeCollection);
        setColumns(getAllColumns(response.data));
        setDocuments(response.data);
      } catch (error) {
        console.error(error);
        setDocuments([]);
      }
    };

    fetchDocuments();
  }, [activeCollection, client]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <CollectionMenu
        collections={collections}
        setActiveCollection={setActiveCollection}
        setCollections={setCollections}
      />
      <DocumentTable
        collection={activeCollection}
        columns={columns}
        documents={documents}
      />
    </Box>
  );
}

export default Data;
