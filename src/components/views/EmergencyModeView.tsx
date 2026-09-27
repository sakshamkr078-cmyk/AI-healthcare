import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Siren, 
  AlertOctagon, 
  ShieldAlert, 
  Truck, 
  Radio, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Send,
  Lock
} from 'lucide-react';

export const EmergencyModeView: React.FC = () => {
  const { isEmergencyMode, toggleEmergencyMode, addToast, setCurrentView } = useApp();
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastHistory, setBroadcastHistory] = useState([
    { id: 'BC-1', time: '00:20 IST', sender: 'State Health Command', message: 'Monsoon Alert: Palar basin water level rising. All rural PHCs ensure standby generators & ILR solar batteries 100% charged.' },
    { id: 'BC-2', time: '23:45 IST (Yesterday)', sender: 'District Epidemic Officer', message: 'Snakebite surge protocol activated for Madurantakam and Cheyyar taluks. Prioritize Polyvalent Antivenom rebalancing.' }
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    const newBc = {
      id: 'BC-' + (broadcastHistory.length + 1),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      sender: 'District Emergency Controller',
      message: broadcastText.trim()
    };
    setBroadcastHistory([newBc, ...broadcastHistory]);
    setBroadcastText('');
    addToast('success', 'Emergency Broadcast Dispatched', 'Broadcast transmitted to all 28 PHC edge terminals.');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Siren size={20} style={{ color: isEmergencyMode ? '#dc2626' : '#d97706' }} />
            <h1 className="text-title" style={{ fontSize: '24px', margin: 0, color: isEmergencyMode ? '#991b1b' : '#0f352e' }}>
              Emergency Operations &amp; Surge Contingency
            </h1>
          </div>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>How do we coordinate rapid mutual-aid during epidemics or severe natural disasters?</strong>
          </p>
        </div>

        <button
          onClick={toggleEmergencyMode}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            backgroundColor: isEmergencyMode ? '#dc2626' : '#f7f8f6',
            color: isEmergencyMode ? '#ffffff' : '#0f352e',
            border: `1.5px solid ${isEmergencyMode ? '#dc2626' : '#b2c5bd'}`,
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: isEmergencyMode ? '0 4px 14px rgba(220, 38, 38, 0.3)' : 'none'
          }}
        >
          <AlertOctagon size={16} />
          {isEmergencyMode ? 'DISENGAGE EMERGENCY PROTOCOL' : 'ENGAGE EPIDEMIC SURGE OVERRIDE'}
        </button>
      </div>

      {/* Emergency Status Banner */}
      <div
        style={{
          backgroundColor: isEmergencyMode ? '#fff1f2' : '#ffffff',
          border: `1.5px solid ${isEmergencyMode ? '#fecdd3' : '#d4e0da'}`,
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '24px',
          boxShadow: '0 2px 10px rgba(15, 53, 46, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: isEmergencyMode ? '#dc2626' : '#16a34a'
                }}
              />
              <span style={{ fontSize: '15px', fontWeight: 800, color: isEmergencyMode ? '#991b1b' : '#0f352e' }}>
                {isEmergencyMode ? 'CURRENT STATUS: CODE RED — ACTIVE MONSOON SURGE CONTINGENCY' : 'CURRENT STATUS: CODE GREEN — STANDARD SURVEILLANCE READINESS'}
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475a55', margin: 0 }}>
              {isEmergencyMode
                ? 'Expedited mutual-aid dispatch authorized. Highway police green-corridor alert active. Emergency regional stockpile buffer unlocked.'
                : 'All standard inter-PHC checks, 14-day donor minimum safety buffers, and routine review workflows in effect.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setCurrentView('resolve')}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#194d43',
                color: '#ffffff'
              }}
            >
              Go to Rapid Solver
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Command Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '20px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Rapid Mobilization Action Tiles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
            Expedited Mutual-Aid Directives
          </h2>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} style={{ color: '#194d43' }} />
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f352e' }}>
                  Fast-Track Green Corridor Routing
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a' }}>ACTIVE</span>
            </div>
            <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.4, marginBottom: '8px' }}>
              Authorizes police escort for cold-chain vans on NH-32 and NH-48. Reduces transit time from 42 mins to 28 mins during road congestion.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} style={{ color: '#ea580c' }} />
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f352e' }}>
                  Regional Strategic Stockpile Release
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#ea580c' }}>STANDBY</span>
            </div>
            <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.4, marginBottom: '8px' }}>
              Chengalpattu District Medical Depot holds 3,000 reserve antivenom vials (Batch #TN-STK-2026). Unlocks upon dual-signature from District Collector and CMO.
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={16} style={{ color: '#194d43' }} />
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f352e' }}>
                  Dedicated 24/7 Clinical Emergency Hotline
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#0f352e' }}>
                104 / +91 44 2742 0999
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.4 }}>
              Direct line between District Epidemic Controller, PHC Medical Officers, and Central Ambulance Dispatch.
            </p>
          </div>
        </div>

        {/* Right Column: Live Network Broadcast & Ticker */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Radio size={16} style={{ color: '#194d43' }} />
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
              Network Emergency Broadcast Channel
            </h2>
          </div>

          {/* Broadcast Form */}
          <form onSubmit={handleBroadcast} style={{ marginBottom: '16px' }}>
            <textarea
              rows={3}
              placeholder="Transmit high-priority advisory to all 28 PHC display consoles..."
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #b2c5bd',
                fontSize: '12.5px',
                fontFamily: 'inherit',
                outline: 'none',
                marginBottom: '8px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '6px 14px',
                  backgroundColor: '#194d43',
                  color: '#ffffff',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Send size={12} />
                Transmit Broadcast
              </button>
            </div>
          </form>

          {/* Broadcast Ticker Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
            {broadcastHistory.map(bc => (
              <div key={bc.id} style={{ backgroundColor: '#fafbf9', border: '1px solid #e5ece8', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#194d43' }}>
                    {bc.sender}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#768a84' }}>
                    {bc.time}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#2d453f', lineHeight: 1.4, margin: 0 }}>
                  {bc.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
