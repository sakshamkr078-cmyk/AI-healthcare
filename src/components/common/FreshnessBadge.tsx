import React from 'react';
import { Clock, Wifi, AlertCircle } from 'lucide-react';

interface FreshnessBadgeProps {
  minutesAgo: number;
  source?: string;
  isStaleThreshold?: number; // default 30 mins
}

export const FreshnessBadge: React.FC<FreshnessBadgeProps> = ({ 
  minutesAgo, 
  source = 'IoT Smart Fridge Sensor',
  isStaleThreshold = 30
}) => {
  const isStale = minutesAgo >= isStaleThreshold;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        padding: '3px 8px',
        borderRadius: '6px',
        backgroundColor: isStale ? '#fff7ed' : '#f0fdf4',
        border: `1px solid ${isStale ? '#fed7aa' : '#bbf7d0'}`,
        color: isStale ? '#9a3412' : '#166534',
        fontWeight: 500
      }}
      title={`Telemetry source: ${source}. Auto-synced.`}
    >
      {isStale ? (
        <AlertCircle size={13} style={{ color: '#ea580c' }} />
      ) : (
        <Wifi size={13} style={{ color: '#16a34a' }} />
      )}
      <span>
        {isStale ? (
          <>
            <strong>Data stale</strong> — updated {minutesAgo}m ago
          </>
        ) : (
          <>
            Updated {minutesAgo}m ago <span style={{ opacity: 0.7 }}>({source})</span>
          </>
        )}
      </span>
      <Clock size={11} style={{ opacity: 0.6 }} />
    </div>
  );
};
