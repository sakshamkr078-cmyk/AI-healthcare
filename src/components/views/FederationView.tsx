import React from 'react';
import { useApp } from '../../context/AppContext';
import { FEDERATED_STATUS } from '../../data/mockData';
import { 
  Network, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  ArrowRight, 
  Database, 
  Server, 
  EyeOff, 
  CheckCircle2 
} from 'lucide-react';

export const FederationView: React.FC = () => {
  const { phcNodes } = useApp();

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
            <Network size={20} style={{ color: '#088fa6' }} />
            <h1 className="text-title" style={{ fontSize: '24px', margin: 0 }}>
              Federated AI Architecture &amp; Privacy Core
            </h1>
          </div>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>How does the network aggregate global predictive intelligence without ever transmitting raw patient records?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#e6f6f9',
              color: '#088fa6',
              border: '1px solid #bce5ec',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lock size={13} />
            Differential Privacy Active (\u03b5 = {FEDERATED_STATUS.privacyEpsilon})
          </span>
        </div>
      </div>

      {/* Philosophy Callout: The Federated Chain */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #b2c5bd',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(15, 53, 46, 0.05)'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#507e72', marginBottom: '8px' }}>
          Core Infrastructure Architecture
        </div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f352e', marginBottom: '14px' }}>
          PHCs → Edge Nodes → Local Gradient Training → Secure Differential Aggregation → Global Intelligence
        </div>

        {/* 3 Step Diagrammatic Architecture */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {/* Step 1 */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Database size={16} style={{ color: '#194d43' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e' }}>
                1. On-Premise Edge Training
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.45 }}>
              Each of the 28 PHCs runs an edge ML container locally. Electronic Health Records, prescription logs, and fridge counts stay inside the PHC physical server. <strong>Zero patient identities leave the building.</strong>
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <EyeOff size={16} style={{ color: '#088fa6' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e' }}>
                2. Privacy-Preserving Gradients
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.45 }}>
              Only mathematical model weight updates (gradients) are transmitted to the district aggregator, obfuscated with calibrated Gaussian noise (\(\epsilon = 0.82\)) to make individual patient reconstruction mathematically impossible.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Server size={16} style={{ color: '#16a34a' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e' }}>
                3. Global Consensus Model
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.45 }}>
              The central coordinator performs Secure FedAvg aggregation (Round #{FEDERATED_STATUS.currentRound}), creating a district-wide predictive model that detects emerging outbreaks 4 days earlier than any isolated PHC could.
            </p>
          </div>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #d4e0da',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: '0 1px 4px rgba(15, 53, 46, 0.04)'
        }}
      >
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #d4e0da', backgroundColor: '#f7f8f6' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
            Architecture Performance &amp; Privacy Comparison
          </h2>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5ece8', fontSize: '11px', color: '#768a84', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Architecture Paradigm</th>
              <th style={{ padding: '12px 16px' }}>Surge Detection Accuracy</th>
              <th style={{ padding: '12px 16px' }}>Patient Privacy Leakage Risk</th>
              <th style={{ padding: '12px 16px' }}>Regulatory Compliance</th>
              <th style={{ padding: '12px 16px' }}>Network Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5ece8' }}>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>Isolated Siloed PHC Models</div>
                <div style={{ fontSize: '11px', color: '#768a84' }}>No data or gradient sharing across PHCs</div>
              </td>
              <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#d97706', fontWeight: 700 }}>
                71.2% (Misses regional surges)
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#16a34a', fontWeight: 600 }}>
                Zero Risk (No external sharing)
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#507e72' }}>
                Compliant, but clinically inadequate
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ fontSize: '11px', color: '#768a84' }}>Legacy Baseline</span>
              </td>
            </tr>

            <tr style={{ borderBottom: '1px solid #e5ece8' }}>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>Centralized Data Lake</div>
                <div style={{ fontSize: '11px', color: '#768a84' }}>All PHCs upload raw patient database to cloud</div>
              </td>
              <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#0f352e', fontWeight: 700 }}>
                94.1%
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#dc2626', fontWeight: 700 }}>
                SEVERE RISK (Exposes 1.2M medical records)
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#dc2626', fontWeight: 600 }}>
                VIOLATES Health Data Privacy Laws
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 700 }}>PROHIBITED</span>
              </td>
            </tr>

            <tr style={{ backgroundColor: '#f0fdf4' }}>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#166534' }}>PHC FEDERATED AI (Active System)</div>
                <div style={{ fontSize: '11px', color: '#15803d' }}>Local on-premise training + Encrypted FedAvg</div>
              </td>
              <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#166534', fontWeight: 800 }}>
                93.8% (+22.6% over siloed)
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#16a34a', fontWeight: 800 }}>
                ZERO RAW RECORDS EXPOSED (Mathematically Guaranteed)
              </td>
              <td style={{ padding: '12px 16px', fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>
                100% Fully Compliant
              </td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#16a34a', color: '#ffffff' }}>
                  ACTIVE DEPLOYED
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Real-time Federated Round Telemetry Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px'
        }}
      >
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#768a84', textTransform: 'uppercase' }}>Current Round</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 800, color: '#0f352e', marginTop: '2px' }}>
            #{FEDERATED_STATUS.currentRound} / {FEDERATED_STATUS.targetRounds}
          </div>
          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>99.4% Convergence</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#768a84', textTransform: 'uppercase' }}>Reporting Edge Nodes</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 800, color: '#0f352e', marginTop: '2px' }}>
            {FEDERATED_STATUS.edgeNodesReporting} / {FEDERATED_STATUS.totalEdgeNodes}
          </div>
          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>100% Edge Gateways Online</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#768a84', textTransform: 'uppercase' }}>Differential Privacy (\u03b5)</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 800, color: '#088fa6', marginTop: '2px' }}>
            \u03b5 = {FEDERATED_STATUS.privacyEpsilon}
          </div>
          <span style={{ fontSize: '11px', color: '#507e72' }}>Relaxed \u03b4 = {FEDERATED_STATUS.privacyDelta}</span>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#768a84', textTransform: 'uppercase' }}>Round Duration</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 800, color: '#0f352e', marginTop: '2px' }}>
            {FEDERATED_STATUS.lastRoundDurationSeconds}s
          </div>
          <span style={{ fontSize: '11px', color: '#507e72' }}>Global Loss: {FEDERATED_STATUS.globalLoss}</span>
        </div>
      </div>
    </div>
  );
};
