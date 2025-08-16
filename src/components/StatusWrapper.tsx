import React from 'react';
import Skeleton from './Skeleton';

interface StatusWrapperProps {
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
  loadingContent?: React.ReactNode;
}

const StatusWrapper: React.FC<StatusWrapperProps> = ({
  isLoading,
  error,
  refetch,
  children,
  loadingMessage = 'Loading...',
  errorMessage = 'Failed to load data',
  loadingContent,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        {loadingContent ? loadingContent : <p>{loadingMessage}</p>}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg mb-4">{errorMessage}: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default StatusWrapper;
