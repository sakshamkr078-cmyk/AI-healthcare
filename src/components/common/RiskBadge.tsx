import React from 'react';
import { RiskLevel } from '../../types';
import { AlertCircle, AlertTriangle, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          bg: '#fee2e2',
          text: '#991b1b',
          border: '#fca5a5',
          label: 'CRITICAL',
          icon: <ShieldAlert size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        };
      case 'HIGH':
        return {
          bg: '#ffedd5',
          text: '#9a3412',
          border: '#fdba74',
          label: 'HIGH RISK',
          icon: <AlertCircle size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        };
      case 'ELEVATED':
        return {
          bg: '#fef3c7',
          text: '#92400e',
          border: '#fcd34d',
          label: 'ELEVATED',
          icon: <AlertTriangle size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        };
      case 'WATCHLIST':
        return {
          bg: '#e0f2fe',
          text: '#0369a1',
          border: '#7dd3fc',
          label: 'WATCHLIST',
          icon: <Eye size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        };
      case 'STABLE':
      default:
        return {
          bg: '#f0fdf4',
          text: '#166534',
          border: '#86efac',
          label: 'STABLE',
          icon: <CheckCircle2 size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />
        };
    }
  };

  const config = getBadgeConfig();
  const padding = size === 'sm' ? '2px 6px' : size === 'lg' ? '5px 12px' : '3px 8px';
  const fontSize = size === 'sm' ? '11px' : size === 'lg' ? '13px' : '12px';

  return (
    <span
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding,
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        borderRadius: '9999px',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.04em',
        lineHeight: 1,
        whiteSpace: 'nowrap'
      }}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
