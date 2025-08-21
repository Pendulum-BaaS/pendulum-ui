import { useState, useEffect, useContext } from "react";
import {
  type Document,
  type DatabaseEvent,
  type RealtimeFunction,
} from "../types/types";
import { Box } from "@mui/material";
import CollectionMenu from "./CollectionMenu";
import DocumentTable from "./DocumentTable";
import { type GridColDef } from "@mui/x-data-grid";
import { PendulumContext } from "../contexts/PendulumProvider";

function Data() {
  const { client } = useContext(PendulumContext);
  const [collections, setCollections] = useState<string[]>([]);
  const [activeCollection, setActiveCollection] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const getAllColumns = (documents: Document[]): GridColDef[] => {
    const columns = new Set();

    for (const doc of documents) {
      const keys = Object.keys(doc);
      keys.forEach((key) => columns.add(key));
    }

    return [...columns].map((col) => {
      const columnDef: GridColDef = {
        field: col as string,
        headerName: col as string,
        width: 200,
      };

      // _id cells get rendered as pills
      if (col === "_id") {
        columnDef.renderCell = (params) => (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Box
              sx={{
                backgroundColor: "rgba(106, 76, 147, 0.2)",
                border: "1px solid rgba(106, 76, 147, 0.4)",
                borderRadius: "12px",
                px: 0.5,
                py: 0.5,
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: "#ffffff",
                display: "inline-block",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                lineHeight: 1.7,
              }}
              title={params.value}
            >
              {params.value}
            </Box>
          </Box>
        );
        columnDef.width = 220;
      }

      return columnDef;
    });
  };

  const updateDocuments: RealtimeFunction = (data: DatabaseEvent) => {
    const { action, eventData } = data;

    switch (action) {
      case "insert":
        setDocuments((prev) => [...(eventData.affected || []), ...prev]);
        break;
      case "update":
        setDocuments((prev) =>
          prev.map((doc) =>
            eventData.ids!.includes(doc._id)
              ? eventData.affected!.find((d) => d._id === doc._id)
              : doc,
          ),
        );
        break;
      case "delete":
        setDocuments((prev) =>
          prev.filter((doc) => !eventData.ids!.includes(doc._id)),
        );
        break;
    }
  };

  useEffect(() => {
    if (documents.length > 0) {
      const newColumns = getAllColumns(documents);
      if (JSON.stringify(newColumns) !== JSON.stringify(columns)) {
        setColumns(newColumns);
      }
    } else {
      if (columns.length > 0) setColumns([]);
    }
  }, [documents]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!activeCollection || activeCollection.trim() === "") {
        setDocuments([]);
        setColumns([]);
        return;
      }

      try {
        const response = await client.db.getAll(activeCollection);
        if (response.success) {
          const dataArray = Array.isArray(response.data) ? response.data : [];
          setColumns(getAllColumns(dataArray));
          setDocuments(dataArray);
        } else {
          setColumns([]);
          setDocuments([]);
        }
      } catch (error) {
        console.error("Error in fetchDocuments:", error);
        setDocuments([]);
        setColumns([]);
      }
    };

    fetchDocuments();
    client.realtime.subscribe(activeCollection, updateDocuments);
    return () => client.realtime.unsubscribe(activeCollection, updateDocuments);
  }, [activeCollection, client]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await client.getAllCollections();
        if (response.success) {
          const collections = response.data.collections.sort();
          setCollections(collections);
          setActiveCollection(collections[0] || "");
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
        setCollections([]);
        setActiveCollection("");
      }
    };

    fetchCollections();
  }, [client]);

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
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        setCollections={setCollections}
      />
      <DocumentTable
        collections={collections}
        setCollections={setCollections}
        activeCollection={activeCollection}
        setActiveCollection={setActiveCollection}
        columns={columns}
        setColumns={setColumns}
        documents={documents}
        setDocuments={setDocuments}
      />
    </Box>
  );
}

export default Data;
