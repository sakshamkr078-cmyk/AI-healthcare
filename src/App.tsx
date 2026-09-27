import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { SubHeaderBreadcrumb } from './components/layout/SubHeaderBreadcrumb';
import { ToastContainer } from './components/layout/ToastContainer';
import { QuickCommandPalette } from './components/layout/QuickCommandPalette';
import { ModifyTransferModal } from './components/layout/ModifyTransferModal';

// Views
import { NetworkPulseView } from './components/views/NetworkPulseView';
import { RiskRadarView } from './components/views/RiskRadarView';
import { PhcWorkspaceView } from './components/views/PhcWorkspaceView';
import { ResolveView } from './components/views/ResolveView';
import { AiExplanationView } from './components/views/AiExplanationView';
import { HumanApprovalView } from './components/views/HumanApprovalView';
import { AuditView } from './components/views/AuditView';
import { FederationView } from './components/views/FederationView';
import { EmergencyModeView } from './components/views/EmergencyModeView';

import { ShieldCheck, HeartPulse, Lock } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'network-pulse':
        return <NetworkPulseView />;
      case 'risk-radar':
        return <RiskRadarView />;
      case 'phc-workspace':
        return <PhcWorkspaceView />;
      case 'resolve':
        return <ResolveView />;
      case 'ai-explanation':
        return <AiExplanationView />;
      case 'human-approval':
        return <HumanApprovalView />;
      case 'audit':
        return <AuditView />;
      case 'federation':
        return <FederationView />;
      case 'emergency':
        return <EmergencyModeView />;
      default:
        return <NetworkPulseView />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f7f8f6' }}>
      {/* Top Application Header */}
      <Header />

      {/* Decision-Support Chain Subheader */}
      <SubHeaderBreadcrumb />

      {/* Main Screen Experience */}
      <main style={{ flex: 1, paddingBottom: '40px' }}>
        {renderActiveView()}
      </main>

      {/* Clinical Command Centre Footer */}
      <footer
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #d4e0da',
          padding: '16px 24px',
          marginTop: 'auto',
          fontSize: '12px',
          color: '#507e72'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, color: '#0f352e' }}>PHC FEDERATED AI</span>
            <span>•</span>
            <span>Tamil Nadu Health Systems Network • Arcot &amp; Chengalpattu Health Block</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11.5px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} style={{ color: '#088fa6' }} />
              <span>Differential Privacy (\u03b5 = 0.82)</span>
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HeartPulse size={12} style={{ color: '#16a34a' }} />
              <span>Zero Raw Patient Records Exported</span>
            </span>
            <span>•</span>
            <span style={{ fontWeight: 700, color: '#0f352e' }}>
              AI ASSISTS. HUMANS DECIDE.
            </span>
          </div>
        </div>
      </footer>

      {/* Global Interactive Overlays */}
      <ToastContainer />
      <QuickCommandPalette />
      <ModifyTransferModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
