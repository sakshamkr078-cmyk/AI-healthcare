import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenView } from '../../types';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';

export const SubHeaderBreadcrumb: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const getPhaseInfo = (view: ScreenView) => {
    switch (view) {
      case 'network-pulse':
        return {
          phase: 'SEE',
          question: 'Where is the problem?',
          description: 'Network-wide operational overview & risk clustering',
          step: 1
        };
      case 'risk-radar':
        return {
          phase: 'SEE',
          question: 'What needs attention?',
          description: 'Critical shortages, depletion velocity & demand pressure',
          step: 2
        };
      case 'phc-workspace':
        return {
          phase: 'UNDERSTAND',
          question: 'Why is this happening?',
          description: 'Granular PHC inventory, epidemiological surge & forecast curves',
          step: 3
        };
      case 'resolve':
        return {
          phase: 'ACT',
          question: 'What can safely be done?',
          description: 'Constrained mutual-aid allocation & candidate donor evaluation',
          step: 4
        };
      case 'ai-explanation':
        return {
          phase: 'UNDERSTAND',
          question: 'Why this recommendation?',
          description: 'Step-by-step reasoning, feature attribution, constraints & assumptions',
          step: 5
        };
      case 'human-approval':
        return {
          phase: 'ACT',
          question: 'Do I approve this action?',
          description: 'High-stakes decision console, impact preview & digital sign-off',
          step: 6
        };
      case 'audit':
        return {
          phase: 'VERIFY',
          question: 'What happened and why?',
          description: 'Chronological immutable ledger, reconstructable decisions & cryptographic seal',
          step: 7
        };
      case 'federation':
        return {
          phase: 'VERIFY',
          question: 'How is intelligence aggregated without sharing raw patient data?',
          description: 'Differential privacy parameters, 28 edge nodes & model convergence',
          step: 8
        };
      case 'emergency':
        return {
          phase: 'ACT',
          question: 'How do we coordinate rapid emergency response?',
          description: 'Surge mobilization, prioritized green corridors & fleet override',
          step: 9
        };
    }
  };

  const currentInfo = getPhaseInfo(currentView);

  const phases: { name: 'SEE' | 'UNDERSTAND' | 'ACT' | 'VERIFY'; targetView: ScreenView }[] = [
    { name: 'SEE', targetView: 'network-pulse' },
    { name: 'UNDERSTAND', targetView: 'phc-workspace' },
    { name: 'ACT', targetView: 'resolve' },
    { name: 'VERIFY', targetView: 'audit' }
  ];

  return (
    <div
      style={{
        backgroundColor: '#f7f8f6',
        borderBottom: '1px solid #e5ece8',
        padding: '10px 24px'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Core Philosophy Chain Flow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Operational Chain:
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {phases.map((p, idx) => {
              const isCurrent = p.name === currentInfo.phase;
              return (
                <React.Fragment key={p.name}>
                  {idx > 0 && (
                    <ArrowRight size={11} style={{ color: '#b2c5bd' }} />
                  )}
                  <button
                    onClick={() => setCurrentView(p.targetView)}
                    style={{
                      fontSize: '11px',
                      fontWeight: isCurrent ? 800 : 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: isCurrent ? '#0f352e' : '#ffffff',
                      color: isCurrent ? '#ffffff' : '#507e72',
                      border: `1px solid ${isCurrent ? '#0f352e' : '#d4e0da'}`,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {p.name}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <span style={{ color: '#d4e0da', margin: '0 4px' }}>|</span>

          {/* Primary Question Prompt */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
              &ldquo;{currentInfo.question}&rdquo;
            </span>
            <span style={{ fontSize: '12px', color: '#768a84' }}>
              — {currentInfo.description}
            </span>
          </div>
        </div>

        {/* Guiding Principle Motto */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#194d43',
            backgroundColor: '#e8f3f0',
            padding: '3px 10px',
            borderRadius: '6px',
            border: '1px solid #b2c5bd',
            fontWeight: 700
          }}
        >
          <Shield size={13} style={{ color: '#16a34a' }} />
          <span>AI ASSISTS. HUMANS DECIDE.</span>
        </div>
      </div>
    </div>
  );
};
