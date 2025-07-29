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
      }}
    >
      <Header />

      <Box sx={{ display: "flex", flex: 1 }}>
        {sidebarCollapsed ? (
          <CollapsedSidebar expand={() => setSidebarCollapsed(false)} />
        ) : (
          <ExpandedSidebar collapse={() => setSidebarCollapsed(true)} />
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: sidebarCollapsed ? "64px" : "240px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/data" />}></Route>
            <Route path="/data" element={<Data />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/logs" element={<Logs />}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
