import React from 'react';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../common/MetricCard';
import { NetworkMapCanvas } from '../common/NetworkMapCanvas';
import { FreshnessBadge } from '../common/FreshnessBadge';
import { RiskBadge } from '../common/RiskBadge';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Truck,
  Sparkles
} from 'lucide-react';

export const NetworkPulseView: React.FC = () => {
  const { 
    phcNodes, 
    setCurrentView, 
    setSelectedPhcId, 
    alerts, 
    activeProposal 
  } = useApp();

  const totalPhcs = phcNodes.length;
  const criticalPhcs = phcNodes.filter(p => p.overallRisk === 'CRITICAL');
  const elevatedPhcs = phcNodes.filter(p => p.overallRisk === 'HIGH' || p.overallRisk === 'ELEVATED');
  const stablePhcs = phcNodes.filter(p => p.overallRisk === 'STABLE');

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      {/* Top Operational Context Bar */}
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
          <h1 className="text-title" style={{ fontSize: '24px', margin: 0 }}>
            Network Pulse Overview
          </h1>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>Where is the problem across the 28 PHC network?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FreshnessBadge minutesAgo={6} source="Edge Gateways Synced" />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '6px',
              backgroundColor: '#e8f3f0',
              color: '#0f352e',
              border: '1px solid #b2c5bd'
            }}
          >
            District: North Arcot &amp; Chengalpattu
          </span>
        </div>
      </div>

      {/* 4 Focused Core KPIs (Restrained, high clarity) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '22px'
        }}
      >
        <MetricCard
          label="Network Operational Health"
          value="94.2%"
          subtext="27 of 28 nodes fully operational"
          status="safe"
          trend="up"
          trendText="Resilient"
        />

        <MetricCard
          label="Critical Supply Shortage"
          value={criticalPhcs.length}
          unit="PHC"
          subtext="PHC 184 — Antivenom (1.2d coverage)"
          status={criticalPhcs.length > 0 ? 'critical' : 'safe'}
          trend="up"
          trendText="Action Required"
          onClick={() => {
            setSelectedPhcId('PHC-184');
            setCurrentView('resolve');
          }}
        />

        <MetricCard
          label="Elevated Watchlist"
          value={elevatedPhcs.length}
          unit="PHCs"
          subtext="Cold chain warning at PHC 109"
          status="warning"
          trend="neutral"
          trendText="Monitored"
          onClick={() => setCurrentView('risk-radar')}
        />

        <MetricCard
          label="Active Mutual-Aid Proposal"
          value={activeProposal.status === 'APPROVED' ? 'Dispatched' : '1 Pending'}
          subtext="400 vials ASV from PHC 192"
          status={activeProposal.status === 'APPROVED' ? 'safe' : 'normal'}
          highlight={true}
          onClick={() => setCurrentView('human-approval')}
        />
      </div>

      {/* Main Grid: Interactive Network Map Canvas + Active Exception Stream */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '20px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Interactive Map and Transfer Vector */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} style={{ color: '#194d43' }} />
              <h2 className="text-section-title" style={{ fontSize: '16px', margin: 0 }}>
                Spatial Network Topology &amp; Supply Corridors
              </h2>
            </div>
            <span style={{ fontSize: '11px', color: '#507e72', fontWeight: 600 }}>
              Click any node to inspect workspace
            </span>
          </div>

          <NetworkMapCanvas height={460} interactive={true} />

          {/* Active Corridor Card */}
          <div
            style={{
              marginTop: '14px',
              backgroundColor: '#ffffff',
              border: '1px solid #d4e0da',
              borderRadius: '10px',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(15, 53, 46, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#e8f3f0',
                  color: '#194d43',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Truck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
                  Active Safe Transfer Corridor: NH-32 Southbound
                </div>
                <div style={{ fontSize: '12px', color: '#507e72' }}>
                  PHC 192 (Chengalpattu) → PHC 184 (Madurantakam) • 32.4 km • 42 mins via dedicated refrigerated van
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('resolve')}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#194d43',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Inspect Intervention
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Right Column: Operational Exceptions & Imminent Risks */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={16} style={{ color: '#dc2626' }} />
              <h2 className="text-section-title" style={{ fontSize: '16px', margin: 0 }}>
                Critical Operational Exceptions
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('risk-radar')}
              style={{ fontSize: '12px', fontWeight: 700, color: '#194d43' }}
            >
              Full Risk Radar →
            </button>
          </div>

          {/* Exception Alerts Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
            {alerts.map(alert => {
              const isResolved = alert.resolved;
              const isCrit = alert.severity === 'CRITICAL';

              return (
                <div
                  key={alert.id}
                  style={{
                    backgroundColor: isResolved ? '#fafbf9' : '#ffffff',
                    border: `1.5px solid ${
                      isResolved 
                        ? '#d4e0da' 
                        : isCrit 
                          ? '#fca5a5' 
                          : '#fde68a'
                    }`,
                    borderRadius: '10px',
                    padding: '14px 16px',
                    boxShadow: '0 1px 3px rgba(15, 53, 46, 0.04)',
                    opacity: isResolved ? 0.75 : 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <RiskBadge level={isCrit ? 'CRITICAL' : 'ELEVATED'} size="sm" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f352e' }}>
                        {alert.phcName}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#768a84', fontWeight: 500 }}>
                      {alert.timestamp}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 700, color: isCrit ? '#991b1b' : '#0f352e', marginBottom: '4px' }}>
                    {alert.title}
                  </div>

                  <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.4, marginBottom: '10px' }}>
                    {alert.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f3f0', paddingTop: '8px' }}>
                    <span style={{ fontSize: '11px', color: isResolved ? '#16a34a' : '#507e72', fontWeight: 600 }}>
                      {isResolved ? '✓ Mitigated via Approved Transfer' : 'Decision Pending'}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedPhcId(alert.phcId);
                        setCurrentView(alert.actionRoute);
                      }}
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#194d43',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      Resolve &amp; Act
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Summary Box: What Can Safely Be Done? */}
          <div
            style={{
              backgroundColor: '#f2f8f6',
              border: '1px solid #b2c5bd',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} style={{ color: '#194d43' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f352e' }}>
                AI Decision Synthesis
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#2d453f', lineHeight: 1.45 }}>
              The network has identified an optimal, safe mutual-aid donor (PHC 192) with 1,150 vials surplus above mandatory safety buffer. Zero road obstructions reported along NH-32. Human approval requested.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={() => setCurrentView('human-approval')}
                style={{
                  flex: 1,
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '7px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#194d43',
                  color: '#ffffff',
                  textAlign: 'center'
                }}
              >
                Go to Decision Console
              </button>
              <button
                onClick={() => setCurrentView('ai-explanation')}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '7px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #b2c5bd',
                  color: '#194d43'
                }}
              >
                View Evidence
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
