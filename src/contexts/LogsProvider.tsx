import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type LogData, type LogEvent } from "../types/types";

interface LogsContextType {
  logEntries: LogData[];
  isConnected: boolean;
  clearLogs: () => void;
}

const LogsContext = createContext<LogsContextType>({} as LogsContextType);

function LogsProvider({ children }: { children: ReactNode }) {
  const MAX_LOG_LENGTH = 10000;
  const [logEntries, setLogEntries] = useState<LogData[]>([]);
  const setLogSet = useState<Set<string>>(new Set())[1];
  const [isConnected, setIsConnected] = useState(false);

  const createLogKey = useCallback((logData: LogData): string => {
    return `${logData.timestamp}-${logData.method}-${logData.url}-${logData.status}`;
  }, []);

  const handleLogUpdate = useCallback(
    (message: LogEvent) => {
      if (message.type === "log") {
        const logWithId: LogData = {
          ...message.data,
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        const logKey = createLogKey(logWithId);

        setLogSet((prevLogSet) => {
          if (!prevLogSet.has(logKey)) {
            const newLogSet = new Set([...prevLogSet, logKey]);

            setLogEntries((prevLogEntries) => {
              const newLogs = [logWithId, ...prevLogEntries];

              if (newLogs.length > MAX_LOG_LENGTH) {
                const trimmedLogs = newLogs.slice(0, MAX_LOG_LENGTH);
                const removedLog = newLogs[MAX_LOG_LENGTH];

                const finalLogSet = new Set(newLogSet);
                finalLogSet.delete(createLogKey(removedLog));

                setLogSet(finalLogSet);

                return trimmedLogs;
              }

              return newLogs;
            });

            return newLogSet;
          }
          return prevLogSet;
        });
      }
    },
    [createLogKey, MAX_LOG_LENGTH],
  );

  const clearLogs = () => {
    setLogEntries([]);
    setLogSet(new Set());
  };

  useEffect(() => {
    const eventSource = new EventSource("/pendulum/logs");

    eventSource.onopen = () => setIsConnected(true);
    eventSource.onmessage = (e) => handleLogUpdate(JSON.parse(e.data));
    eventSource.onerror = (e) => {
      console.error("SSE error:", e);
      setIsConnected(false);
    };

    return () => eventSource.close();
  }, [handleLogUpdate]);

  const value: LogsContextType = {
    logEntries,
    isConnected,
    clearLogs,
  };

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
}

export { LogsContext, LogsProvider };
