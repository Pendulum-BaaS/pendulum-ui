import {
  createContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import { PendulumClient } from '../../../pendulum-sdk/src/pendulumClient';
import type { PendulumContextType, MutationOperation } from '../types/types';
import type { DatabaseResult } from '../../../pendulum-sdk/src/types';
import type { ReactNode } from 'react';

const PendulumContext = createContext<PendulumContextType | null>(null);
const config = {
  apiUrl: 'http://localhost:3000',
  eventsUrl: 'http://localhost:8080/events',
};

const PendulumProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useRef<PendulumClient | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  if (!clientRef.current) clientRef.current = new PendulumClient(config);

  useEffect(() => {
    if (!clientRef.current) return;

    const client = clientRef.current;
    const handleConnectionStatus = () => setIsConnected(true);

    client.realtime.subscribe('__status__', handleConnectionStatus);

    return () => {
      client.realtime.unsubscribe('__status__', handleConnectionStatus);
      client.realtime.disconnect();
    };
  }, []);

  return (
    <PendulumContext.Provider
      value={{ client: clientRef.current, isConnected }}
    >
      {children}
    </PendulumContext.Provider>
  );
};

export const usePendulum = () => {
  const context = useContext(PendulumContext);

  if (!context) {
    throw new Error('usePendulum must be used within a PendulumProvider');
  }

  return context;
};

export const usePendulumSubscription = (
  collection: string,
  callback: (data: any) => void,
  dependencies: React.DependencyList
) => {
  const { client } = usePendulum();

  useEffect(() => {
    client.realtime.subscribe(collection, callback);
    return () => client.realtime.unsubscribe(collection, callback);
  }, [client, collection, ...dependencies]);
};

export const usePendulumRealtimeQuery = <T = any>(
  collection: string,
  operation: 'getAll' | 'getSome' | 'getOne',
  params?: { id?: string; limit?: number; offset?: number; sortKey?: string }
) => {
  const { client } = usePendulum();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      let result: DatabaseResult<T>;

      switch (operation) {
        case 'getAll':
          result = await client.db.getAll<T>(collection);
          break;
        case 'getSome':
          result = await client.db.getSome<T>(
            collection,
            params?.limit,
            params?.offset,
            params?.sortKey || '_id'
          );
          break;
        case 'getOne':
          if (!params?.id) {
            throw new Error('ID is required for getOne operation');
          };
          result = await client.db.getOne<T>(collection, params.id);
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      };

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Unknown error occured');
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    };
  }, [client, collection, operation, JSON.stringify(params)]);

  const handleRealtimeUpdate = useCallback((event: any) => {
    if (operation === 'getAll' || operation === 'getSome') fetchData();
    if (operation === 'getOne' && params?.id) {
      if ((event.eventData?.ids || []).includes(params.id)) fetchData();
    };
  }, [fetchData, operation, params?.id]);

  usePendulumSubscription(collection, handleRealtimeUpdate, [collection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const usePendulumMutation = <T = any>() => {
  const { client } = usePendulum();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mutate = useCallback(async (
    operation: MutationOperation,
    collection: string,
    params: any
  ): Promise<DatabaseResult<T>> => {
    setLoading(true);
    setError('');

    try {
      let result: DatabaseResult<T>;

      switch (operation) {
        case 'insert':
          result = await client.db.insert<T>(collection, params.newItems);
          break;
        case 'updateOne':
          result = await client.db.updateOne<T>(
            collection,
            params.id,
            params.updateOperation
          );
          break;
        case 'updateSome':
          result = await client.db.updateSome<T>(
            collection,
            params.filter,
            params.updateOperation
          );
          break;
        case 'updateAll':
          result = await client.db.updateAll<T>(
            collection,
            params.updateOperation
          );
          break;
        case 'removeOne':
          result = await client.db.removeOne<T>(collection, params.id);
          break;
        case 'removeSome':
          result = await client.db.removeSome<T>(collection, params.filter);
          break;
        case 'removeAll':
          result = await client.db.removeAll<T>(collection);
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      };

      if (!result.success) setError(result.error || 'Unknown error occurred');
      return result;
    } catch (err) {
      let errorMessage;
      if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = 'Unknown error occurred';
      };

      setError(errorMessage);
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false);
    };
  }, [client]);

  return { mutate, loading, error };
};

export default PendulumProvider;
