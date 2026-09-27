import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  status?: 'normal' | 'warning' | 'critical' | 'safe';
  highlight?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  trend,
  trendText,
  status = 'normal',
  highlight = false,
  onClick
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'critical':
        return {
          indicator: '#dc2626',
          bg: '#ffffff',
          border: '#fecaca',
          valueColor: '#991b1b'
        };
      case 'warning':
        return {
          indicator: '#d97706',
          bg: '#ffffff',
          border: '#fde68a',
          valueColor: '#92400e'
        };
      case 'safe':
        return {
          indicator: '#16a34a',
          bg: '#ffffff',
          border: '#bbf7d0',
          valueColor: '#166534'
        };
      default:
        return {
          indicator: '#507e72',
          bg: highlight ? '#f2f8f6' : '#ffffff',
          border: highlight ? '#b2c5bd' : '#e5ece8',
          valueColor: '#0f352e'
        };
    }
  };

  const st = getStatusStyles();

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: st.bg,
        border: `1px solid ${st.border}`,
        borderRadius: '10px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        boxShadow: '0 1px 3px rgba(15, 53, 46, 0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className={onClick ? 'metric-card-interactive' : ''}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#507e72'
          }}
        >
          {label}
        </span>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: st.indicator
          }}
          aria-hidden="true"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0 6px 0' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '32px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: st.valueColor,
            lineHeight: 1
          }}
        >
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#768a84' }}>
            {unit}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
        {subtext && (
          <span style={{ fontSize: '12px', color: '#475a55', fontWeight: 500 }}>
            {subtext}
          </span>
        )}
        {trendText && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '1px 6px',
              borderRadius: '4px',
              backgroundColor: trend === 'up' && status === 'critical' ? '#fee2e2' : '#e8f3f0',
              color: trend === 'up' && status === 'critical' ? '#991b1b' : '#194d43'
            }}
          >
            {trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : '• '}
            {trendText}
          </span>
        )}
      </div>
    </div>
  );
};
