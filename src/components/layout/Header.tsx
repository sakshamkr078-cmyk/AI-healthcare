import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { SignatureNavHub } from './SignatureNavHub';
import { 
  ShieldCheck, 
  RotateCw, 
  Search, 
  AlertOctagon, 
  UserCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUserRole, 
    setCurrentUserRole, 
    isEmergencyMode, 
    toggleEmergencyMode, 
    refreshTelemetry,
    setIsPaletteOpen,
    alerts
  } = useApp();

  const unresolvedAlertsCount = alerts.filter(a => !a.resolved).length;

  const roleNames: Record<UserRole, string> = {
    DISTRICT_OFFICER: 'Dr. Anita Sharma (District CMO)',
    PHC_OPERATOR: 'Rajesh Verma (PHC 184 MO)',
    EMERGENCY_CONTROLLER: 'Sarah Matthews (Surge Lead)',
    FEDERATION_ADMIN: 'Vikram Sengupta (Privacy Lead)',
    AUDITOR: 'Meera Nambiar (State Auditor)'
  };

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #d4e0da',
        boxShadow: '0 1px 4px rgba(15, 53, 46, 0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}
    >
      {/* Top Banner if Emergency Mode is ON */}
      {isEmergencyMode && (
        <div
          role="alert"
          style={{
            backgroundColor: '#dc2626',
            color: '#ffffff',
            padding: '6px 20px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={16} />
            <span>
              EMERGENCY PROTOCOL ACTIVATED: MONSOON SURGE &amp; AGRICULTURAL SNAKEBITE CONTINGENCY ACTIVE
            </span>
          </div>
          <button
            onClick={toggleEmergencyMode}
            style={{
              backgroundColor: '#ffffff',
              color: '#dc2626',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            DEACTIVATE
          </button>
        </div>
      )}

      {/* Main Command Bar */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Left: Brand & Telemetry Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#194d43',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '17px',
              letterSpacing: '-0.02em',
              boxShadow: '0 2px 6px rgba(25, 77, 67, 0.25)'
            }}
          >
            +
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#0f352e',
                  lineHeight: 1.1
                }}
              >
                PHC FEDERATED AI
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '1px 5px',
                  borderRadius: '3px',
                  backgroundColor: '#e8f3f0',
                  color: '#194d43',
                  border: '1px solid #b2c5bd'
                }}
              >
                SECURE AGGREGATION
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#507e72', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              <span>28 PHC Nodes Active • Live Telemetry</span>
            </div>
          </div>
        </div>

        {/* Center: Signature Nav Hub */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <SignatureNavHub />
        </div>

        {/* Right: Controls & Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '280px', justifyContent: 'flex-end' }}>
          {/* Quick Search Ctrl+K */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: '#f7f8f6',
              border: '1px solid #d4e0da',
              color: '#507e72',
              fontSize: '12px',
              fontWeight: 500
            }}
            title="Search PHCs, resources, commands (Ctrl+K)"
          >
            <Search size={13} />
            <span style={{ display: 'inline-block' }}>Find...</span>
            <kbd
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                backgroundColor: '#ffffff',
                border: '1px solid #d4e0da',
                borderRadius: '3px',
                padding: '1px 4px'
              }}
            >
              Ctrl K
            </kbd>
          </button>

          {/* Telemetry Refresh */}
          <button
            onClick={refreshTelemetry}
            style={{
              padding: '6px',
              borderRadius: '6px',
              backgroundColor: '#f7f8f6',
              border: '1px solid #d4e0da',
              color: '#2b6a5d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Force refresh telemetry from edge nodes"
          >
            <RotateCw size={14} />
          </button>

          {/* Emergency Mode Toggle Button */}
          <button
            onClick={toggleEmergencyMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 11px',
              borderRadius: '6px',
              backgroundColor: isEmergencyMode ? '#fee2e2' : '#f7f8f6',
              border: `1px solid ${isEmergencyMode ? '#fca5a5' : '#d4e0da'}`,
              color: isEmergencyMode ? '#991b1b' : '#507e72',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <AlertOctagon size={14} style={{ color: isEmergencyMode ? '#dc2626' : '#d97706' }} />
            <span>{isEmergencyMode ? 'SURGE ACTIVE' : 'Emergency'}</span>
          </button>

          {/* Active Persona Dropdown */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f3',
              border: '1px solid #b2c5bd',
              borderRadius: '6px',
              padding: '4px 8px'
            }}
          >
            <UserCheck size={14} style={{ color: '#194d43', marginRight: '6px' }} />
            <select
              value={currentUserRole}
              onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
              aria-label="Switch User Persona Role"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#0f352e',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none',
                maxWidth: '180px'
              }}
            >
              <option value="DISTRICT_OFFICER">Officer: Dr. Anita (CMO)</option>
              <option value="PHC_OPERATOR">Operator: Rajesh Verma (MO)</option>
              <option value="EMERGENCY_CONTROLLER">Controller: Sarah (Surge)</option>
              <option value="FEDERATION_ADMIN">Admin: Vikram (Privacy)</option>
              <option value="AUDITOR">Auditor: Meera (Vigilance)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
