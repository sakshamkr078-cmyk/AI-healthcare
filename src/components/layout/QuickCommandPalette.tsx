import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenView } from '../../types';
import { MASTER_RESOURCES } from '../../data/mockData';
import { Search, Building2, Package, ArrowRight, X } from 'lucide-react';

export const QuickCommandPalette: React.FC = () => {
  const { 
    isPaletteOpen, 
    setIsPaletteOpen, 
    phcNodes, 
    setSelectedPhcId, 
    setSelectedResourceId, 
    setCurrentView 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isPaletteOpen]);

  if (!isPaletteOpen) return null;

  const filteredPhcs = phcNodes.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.district.toLowerCase().includes(query.toLowerCase()) ||
    p.code.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredResources = MASTER_RESOURCES.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.id.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const screens: { id: ScreenView; label: string; question: string }[] = [
    { id: 'network-pulse', label: 'Network Pulse', question: 'Where is the problem?' },
    { id: 'risk-radar', label: 'Risk Radar', question: 'What needs attention?' },
    { id: 'phc-workspace', label: 'PHC Workspace', question: 'Why is this happening?' },
    { id: 'resolve', label: 'Resolve & Allocation', question: 'What can safely be done?' },
    { id: 'ai-explanation', label: 'AI Explanation', question: 'Why this recommendation?' },
    { id: 'human-approval', label: 'Human Approval', question: 'Do I approve this action?' },
    { id: 'audit', label: 'Audit Trail', question: 'What happened and why?' },
    { id: 'federation', label: 'Federated Core', question: 'Global intelligence without PII' },
    { id: 'emergency', label: 'Emergency Mode', question: 'Surge & epidemic mutual-aid' }
  ];

  const filteredScreens = screens.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase()) ||
    s.question.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-palette-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 53, 46, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh'
      }}
      onClick={() => setIsPaletteOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(640px, 92vw)',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1.5px solid #b2c5bd',
          boxShadow: '0 20px 50px rgba(15, 53, 46, 0.25)',
          overflow: 'hidden'
        }}
        className="animate-fade-in"
      >
        {/* Search Bar Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            borderBottom: '1px solid #e5ece8'
          }}
        >
          <Search size={18} style={{ color: '#507e72' }} />
          <input
            ref={inputRef}
            id="cmd-palette-title"
            type="text"
            placeholder="Search PHCs, medicines, questions, or command views..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              fontFamily: 'inherit',
              color: '#0f352e'
            }}
          />
          <button
            onClick={() => setIsPaletteOpen(false)}
            style={{ padding: '4px', borderRadius: '4px', color: '#768a84' }}
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '10px 14px' }}>
          {/* Screens Section */}
          {filteredScreens.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase', padding: '4px 8px', letterSpacing: '0.04em' }}>
                Operational Experiences
              </div>
              {filteredScreens.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentView(s.id);
                    setIsPaletteOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f3f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>{s.label}</span>
                    <span style={{ fontSize: '12px', color: '#507e72', marginLeft: '8px' }}>— &ldquo;{s.question}&rdquo;</span>
                  </div>
                  <ArrowRight size={13} style={{ color: '#768a84' }} />
                </button>
              ))}
            </div>
          )}

          {/* PHC Centers Section */}
          {filteredPhcs.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase', padding: '4px 8px', letterSpacing: '0.04em' }}>
                Public Health Centres
              </div>
              {filteredPhcs.map(phc => (
                <button
                  key={phc.id}
                  onClick={() => {
                    setSelectedPhcId(phc.id);
                    setCurrentView('phc-workspace');
                    setIsPaletteOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f3f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={14} style={{ color: '#2b6a5d' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>{phc.name}</span>
                    <span style={{ fontSize: '11px', color: '#768a84' }}>({phc.district})</span>
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: phc.overallRisk === 'CRITICAL' ? '#fee2e2' : '#f0fdf4',
                      color: phc.overallRisk === 'CRITICAL' ? '#991b1b' : '#166534'
                    }}
                  >
                    {phc.overallRisk}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Master Resources Section */}
          {filteredResources.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase', padding: '4px 8px', letterSpacing: '0.04em' }}>
                Medicines &amp; Supplies
              </div>
              {filteredResources.map(res => (
                <button
                  key={res.id}
                  onClick={() => {
                    setSelectedResourceId(res.id);
                    setCurrentView('risk-radar');
                    setIsPaletteOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f3f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={14} style={{ color: '#2b6a5d' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>{res.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#768a84' }}>[{res.id}]</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#507e72', fontWeight: 600 }}>{res.criticalityTier.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            backgroundColor: '#f7f8f6',
            borderTop: '1px solid #e5ece8',
            padding: '8px 16px',
            fontSize: '11px',
            color: '#768a84',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>Use <strong>↑</strong> <strong>↓</strong> to navigate, <strong>Enter</strong> to select</span>
          <span><strong>Esc</strong> to close</span>
        </div>
      </div>
    </div>
  );
};
