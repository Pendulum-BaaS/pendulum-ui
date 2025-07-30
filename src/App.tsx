import { PendulumContext } from "./contexts/PendulumProvider";
import { useContext, useState } from "react";
import Header from "./components/Header";
import CollapsedSidebar from "./components/CollapsedSidebar";
import ExpandedSidebar from "./components/ExpandedSidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Data from "./components/Data";
import Users from "./components/Users";
import Logs from "./components/Logs";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { pendulumGradient } from "./utils/gradients";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6a4c93",
      light: "#8b6bb1",
      dark: "#4a3269",
    },
    secondary: {
      main: "#f39c12",
      light: "#f5b041",
      dark: "#d68910",
    },
    background: {
      default: "rgba(26, 26, 46, 0.95)",
      paper: "rgba(255, 255, 255, 0.05)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          background: "linear-gradient(45deg, #6a4c93 30%, #8b6bb1 90%)",
          boxShadow: "0 3px 5px 2px rgba(106, 76, 147, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #4a3269 30%, #6a4c93 90%)",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6a4c93",
            },
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          "& .MuiDataGrid-cell": {
            borderColor: "rgba(255, 255, 255, 0.12)",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "transparent !important",
            "& .MuiSvgIcon-root": {
              background: pendulumGradient,
              borderRadius: "2px",
              color: "#1a1a2e",
              fontSize: "1.2rem",
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "rgba(106, 76, 147, 0.3)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(106, 76, 147, 0.4)",
            "&:hover": {
              backgroundColor: "rgba(106, 76, 147, 0.5)",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        },
      },
    },
  },
});

function App() {
  const { client } = useContext(PendulumContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #6a4c93 100%)",
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
    </ThemeProvider>
  );
}

export default App;
