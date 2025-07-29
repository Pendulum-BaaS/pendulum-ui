import { PendulumContext } from "./contexts/PendulumProvider";
import { useContext, useState } from "react";
import Header from "./components/Header";
import CollapsedSidebar from "./components/CollapsedSidebar";
import ExpandedSidebar from "./components/ExpandedSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Data from "./components/Data";
import Users from "./components/Users";
import Logs from "./components/Logs";
import { Box } from "@mui/material";

function App() {
  const { client } = useContext(PendulumContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {sidebarCollapsed ? (
          <CollapsedSidebar expand={() => setSidebarCollapsed(false)} />
        ) : (
          <ExpandedSidebar collapse={() => setSidebarCollapsed(true)} />
        )}

        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/data" />}></Route>
            <Route path="/data" element={<Data client={client} />}></Route>
            <Route path="/users" element={<Users client={client} />}></Route>
            <Route path="/logs" element={<Logs client={client} />}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
