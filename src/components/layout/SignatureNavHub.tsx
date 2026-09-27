import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenView } from '../../types';
import { 
  Activity, 
  Radar, 
  Building2, 
  ArrowLeftRight, 
  BrainCircuit, 
  CheckSquare, 
  FileClock, 
  Network, 
  Siren,
  X,
  Compass
} from 'lucide-react';

interface NavItem {
  id: ScreenView;
  label: string;
  question: string;
  phase: 'SEE' | 'UNDERSTAND' | 'ACT' | 'VERIFY';
  icon: React.ReactNode;
  shortcut: string;
}

export const SignatureNavHub: React.FC = () => {
  const { currentView, setCurrentView, isHubOpen, toggleHub, closeHub, isEmergencyMode } = useApp();
  const hubRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    {
      id: 'network-pulse',
      label: 'Network Pulse',
      question: 'Where is the problem?',
      phase: 'SEE',
      icon: <Activity size={17} />,
      shortcut: '1'
    },
    {
      id: 'risk-radar',
      label: 'Risk Radar',
      question: 'What needs attention?',
      phase: 'SEE',
      icon: <Radar size={17} />,
      shortcut: '2'
    },
    {
      id: 'phc-workspace',
      label: 'PHC Workspace',
      question: 'Why is this happening?',
      phase: 'UNDERSTAND',
      icon: <Building2 size={17} />,
      shortcut: '3'
    },
    {
      id: 'resolve',
      label: 'Resolve & Allocate',
      question: 'What can safely be done?',
      phase: 'ACT',
      icon: <ArrowLeftRight size={17} />,
      shortcut: '4'
    },
    {
      id: 'ai-explanation',
      label: 'AI Explanation',
      question: 'Why this recommendation?',
      phase: 'UNDERSTAND',
      icon: <BrainCircuit size={17} />,
      shortcut: '5'
    },
    {
      id: 'human-approval',
      label: 'Human Approval',
      question: 'Do I approve this action?',
      phase: 'ACT',
      icon: <CheckSquare size={17} />,
      shortcut: '6'
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      question: 'What happened and why?',
      phase: 'VERIFY',
      icon: <FileClock size={17} />,
      shortcut: '7'
    },
    {
      id: 'federation',
      label: 'Federated Core',
      question: 'Global intelligence without PII',
      phase: 'VERIFY',
      icon: <Network size={17} />,
      shortcut: '8'
    },
    {
      id: 'emergency',
      label: 'Emergency Mode',
      question: 'Surge & epidemic mutual-aid',
      phase: 'ACT',
      icon: <Siren size={17} />,
      shortcut: '9'
    }
  ];

  // Close radial hub on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hubRef.current && !hubRef.current.contains(e.target as Node)) {
        closeHub();
      }
    };
    if (isHubOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isHubOpen, closeHub]);

  // Keyboard number navigation (1-9)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const target = navItems[num - 1];
        if (target) {
          setCurrentView(target.id);
          closeHub();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentView, closeHub]);

  const activeItem = navItems.find(item => item.id === currentView) || navItems[0];

  return (
    <div ref={hubRef} style={{ position: 'relative', zIndex: 100 }}>
      {/* Central Circular Network Anchor Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={toggleHub}
          aria-expanded={isHubOpen}
          aria-label="Open Network Hub Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            padding: '5px 14px 5px 8px',
            backgroundColor: isHubOpen ? '#0f352e' : '#ffffff',
            color: isHubOpen ? '#ffffff' : '#0f352e',
            border: `1.5px solid ${isHubOpen ? '#0f352e' : '#b2c5bd'}`,
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(15, 53, 46, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Pulsing Central Hub Ring */}
          <div
            style={{
              position: 'relative',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: isEmergencyMode ? '#dc2626' : '#194d43',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Compass size={15} style={{ transform: isHubOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease' }} />
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isEmergencyMode ? '#ea580c' : '#10b981',
                border: '1.5px solid #ffffff'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: isHubOpen ? '#a3cfc4' : '#507e72', fontWeight: 700 }}>
              Network Hub • {activeItem.phase}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              {activeItem.label}
            </span>
          </div>

          <span
            style={{
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '12px',
              backgroundColor: isHubOpen ? 'rgba(255,255,255,0.2)' : '#e8f3f0',
              color: isHubOpen ? '#ffffff' : '#194d43',
              fontWeight: 700,
              marginLeft: '4px'
            }}
          >
            {isHubOpen ? 'ESC' : '9 VIEWS'}
          </span>
        </button>
      </div>

      {/* Radial / Orbital Expanded Navigation Deck */}
      {isHubOpen && (
        <div
          role="dialog"
          aria-label="Network Navigation Hub"
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: '46px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(780px, 94vw)',
            backgroundColor: '#ffffff',
            border: '1.5px solid #b2c5bd',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(15, 53, 46, 0.16)',
            padding: '20px 22px',
            zIndex: 1000
          }}
        >
          {/* Deck Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e5ece8', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#194d43' }} />
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', letterSpacing: '-0.01em' }}>
                PHC FEDERATED AI — NAVIGATION ORBIT
              </span>
              <span style={{ fontSize: '11px', color: '#768a84', fontWeight: 500 }}>
                Press 1–9 or click to navigate
              </span>
            </div>

            <button
              onClick={closeHub}
              style={{
                padding: '4px',
                borderRadius: '6px',
                color: '#507e72',
                backgroundColor: '#f1f3f0'
              }}
              title="Close Hub (Esc)"
            >
              <X size={16} />
            </button>
          </div>

          {/* Grid of the 9 Core Experiences */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '10px'
            }}
          >
            {navItems.map((item, idx) => {
              const isActive = item.id === currentView;
              const isEmerg = item.id === 'emergency';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    closeHub();
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: isActive 
                      ? '#e8f3f0' 
                      : isEmerg 
                        ? '#fff1f2' 
                        : '#fafbf9',
                    border: `1.5px solid ${
                      isActive 
                        ? '#194d43' 
                        : isEmerg 
                          ? '#fecdd3' 
                          : '#e5ece8'
                    }`,
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#f0f5f3';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = isEmerg ? '#fff1f2' : '#fafbf9';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: isActive ? '#0f352e' : isEmerg ? '#dc2626' : '#2b6a5d' }}>
                        {item.icon}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: isActive ? '#0f352e' : '#142421' }}>
                        {item.label}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        backgroundColor: isActive ? '#194d43' : '#e5ece8',
                        color: isActive ? '#ffffff' : '#507e72'
                      }}
                    >
                      {item.shortcut}
                    </span>
                  </div>

                  <div style={{ fontSize: '11.5px', color: isActive ? '#194d43' : '#475a55', fontWeight: 500, lineHeight: 1.3 }}>
                    &ldquo;{item.question}&rdquo;
                  </div>

                  <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#768a84'
                      }}
                    >
                      Phase: {item.phase}
                    </span>
                    {isActive && (
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#16a34a' }}>
                        ● ACTIVE
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Philosophy footer */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #e5ece8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#507e72'
            }}
          >
            <span>
              <strong>Philosophy:</strong> SEE → UNDERSTAND → ACT → VERIFY
            </span>
            <span style={{ fontWeight: 700, color: '#0f352e' }}>
              AI ASSISTS. HUMANS DECIDE.
            </span>
          </div>
        </div>
      )}

      {/* Persistent Horizontal Navigation Pill Strip (Clean Fallback & Speed Switcher) */}
      <nav
        aria-label="Primary Navigation Bar"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          marginTop: '6px',
          flexWrap: 'wrap'
        }}
      >
        {navItems.map(item => {
          const isActive = item.id === currentView;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                fontSize: '12px',
                fontWeight: isActive ? 700 : 500,
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: isActive ? '#194d43' : 'transparent',
                color: isActive ? '#ffffff' : '#2b6a5d',
                transition: 'all 0.12s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = '#e8f3f0';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
