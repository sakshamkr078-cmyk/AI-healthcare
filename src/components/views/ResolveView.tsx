import React from 'react';
import { useApp } from '../../context/AppContext';
import { CANDIDATE_DONORS_FOR_PHC184 } from '../../data/mockData';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Truck, 
  Clock, 
  ArrowRight, 
  Cpu, 
  ThermometerSnowflake, 
  Sliders,
  RotateCcw
} from 'lucide-react';

export const ResolveView: React.FC = () => {
  const { 
    activeProposal, 
    setCurrentView, 
    setIsModifyModalOpen, 
    reRunSolver 
  } = useApp();

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
          <h1 className="text-title" style={{ fontSize: '24px', margin: 0 }}>
            Resolve Shortage: Mutual-Aid Allocation
          </h1>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>What can safely be done to neutralize this shortage without causing secondary harm?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={reRunSolver}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#f7f8f6',
              border: '1px solid #b2c5bd',
              fontSize: '12px',
              fontWeight: 700,
              color: '#194d43'
            }}
          >
            <RotateCcw size={13} />
            Re-run Constrained Solver
          </button>
        </div>
      </div>

      {/* Top Deficit & Recommended Solution Summary Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #b2c5bd',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(15, 53, 46, 0.06)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#194d43',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Cpu size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e' }}>
                Constrained Optimization Recommendation #{activeProposal.id}
              </div>
              <div style={{ fontSize: '12px', color: '#507e72' }}>
                Mixed-Integer Linear Programming (MILP) Solver converged in <strong>142ms</strong> • 0 constraint violations
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: activeProposal.status === 'APPROVED' ? '#f0fdf4' : '#fff7ed',
                color: activeProposal.status === 'APPROVED' ? '#166534' : '#9a3412',
                border: `1px solid ${activeProposal.status === 'APPROVED' ? '#86efac' : '#fed7aa'}`
              }}
            >
              STATUS: {activeProposal.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Transfer Architecture Diagram / Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '16px',
            alignItems: 'center',
            backgroundColor: '#f7f8f6',
            border: '1px solid #d4e0da',
            borderRadius: '10px',
            padding: '18px 20px',
            marginBottom: '18px'
          }}
        >
          {/* Donor Side */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>
              Selected Safe Donor PHC
            </span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e', marginTop: '2px' }}>
              {activeProposal.donorPhcName}
            </div>
            <div style={{ fontSize: '12px', color: '#507e72', marginTop: '4px' }}>
              Current Surplus: <strong>1,150 vials</strong> • Residual Post-Transfer: <strong>52.0 Days</strong>
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
              ✓ Exceeds 14-day emergency buffer guardrail by +38 days
            </div>
          </div>

          {/* Transfer Vector Middle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 12px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                fontWeight: 800,
                color: '#194d43',
                backgroundColor: '#ffffff',
                border: '1.5px solid #194d43',
                borderRadius: '6px',
                padding: '4px 12px',
                marginBottom: '4px'
              }}
            >
              +{activeProposal.quantityUnits} Vials
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#507e72' }}>
              <Truck size={12} />
              <span>42 mins (NH-32)</span>
            </div>
            <ArrowRight size={20} style={{ color: '#194d43', marginTop: '2px' }} />
          </div>

          {/* Receiver Side */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
              Receiving Vulnerable PHC
            </span>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e', marginTop: '2px' }}>
              {activeProposal.receiverPhcName}
            </div>
            <div style={{ fontSize: '12px', color: '#507e72', marginTop: '4px' }}>
              Current Stock: <strong>48 vials</strong> (1.2 days) → Post-Transfer: <strong>{activeProposal.quantityUnits + 48} vials</strong> (11.7 days)
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
              ✓ Stockout hazard completely neutralized (+10.5 days safety)
            </div>
          </div>
        </div>

        {/* Solver Decision Bar Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setIsModifyModalOpen(true)}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #b2c5bd',
                color: '#0f352e',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sliders size={13} />
              Modify Quantity / Route
            </button>

            <button
              onClick={() => setCurrentView('ai-explanation')}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#e8f3f0',
                border: '1px solid #b2c5bd',
                color: '#194d43'
              }}
            >
              Why this recommendation? (Explain)
            </button>
          </div>

          <button
            onClick={() => setCurrentView('human-approval')}
            style={{
              fontSize: '13px',
              fontWeight: 800,
              padding: '8px 18px',
              borderRadius: '6px',
              backgroundColor: '#194d43',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(25, 77, 67, 0.25)'
            }}
          >
            Open Human Decision Console
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Candidate Donors Comparison Table */}
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
            Evaluated Potential Donor PHCs (Boundary Constraints Analysis)
          </h2>
          <span style={{ fontSize: '12px', color: '#507e72' }}>
            All 28 network nodes were analyzed; 4 nearest candidates shown with safety boundary verification:
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5ece8', fontSize: '11px', color: '#768a84', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Candidate Donor</th>
              <th style={{ padding: '12px 16px' }}>Distance / Transit Time</th>
              <th style={{ padding: '12px 16px' }}>Available Stock &amp; Surplus</th>
              <th style={{ padding: '12px 16px' }}>Residual Post-Transfer Buffer</th>
              <th style={{ padding: '12px 16px' }}>Cold Chain Feasibility</th>
              <th style={{ padding: '12px 16px' }}>Solver Verdict</th>
            </tr>
          </thead>
          <tbody>
            {CANDIDATE_DONORS_FOR_PHC184.map(candidate => {
              return (
                <tr
                  key={candidate.phcId}
                  style={{
                    borderBottom: '1px solid #e5ece8',
                    backgroundColor: candidate.isSafe && candidate.phcId === 'PHC-192' ? '#f0fdf4' : candidate.isSafe ? '#ffffff' : '#fffbfb'
                  }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
                      {candidate.phcName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#768a84' }}>
                      Road: {candidate.roadCondition.replace(/_/g, ' ')}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
                      {candidate.distanceKm} km
                    </div>
                    <div style={{ fontSize: '11px', color: '#507e72' }}>
                      {candidate.transitTimeMinutes} mins transit
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
                      {candidate.availableStock} vials
                    </div>
                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
                      +{candidate.surplusAboveSafety} surplus
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '14px',
                        fontWeight: 800,
                        color: candidate.isSafe ? '#16a34a' : '#dc2626'
                      }}
                    >
                      {candidate.postTransferCoverageDays} Days
                    </span>
                    <div style={{ fontSize: '10.5px', color: candidate.isSafe ? '#507e72' : '#dc2626' }}>
                      {candidate.isSafe ? '(Safety buffer preserved)' : '(BREACHES 14-DAY MINIMUM)'}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: candidate.coldChainViability === 'EXCELLENT' ? '#16a34a' : '#d97706' }}>
                      {candidate.coldChainViability}
                    </span>
                    <div style={{ fontSize: '10.5px', color: '#768a84' }}>
                      {candidate.transitTimeMinutes <= 45 ? '< 45m refrigerated van' : 'Requires insulated box'}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    {candidate.isSafe && candidate.phcId === 'PHC-192' ? (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#16a34a',
                          color: '#ffffff'
                        }}
                      >
                        SELECTED OPTIMAL
                      </span>
                    ) : candidate.isSafe ? (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#e8f3f0',
                          color: '#194d43'
                        }}
                      >
                        VIABLE BACKUP
                      </span>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#fee2e2',
                            color: '#991b1b',
                            width: 'fit-content'
                          }}
                        >
                          DISQUALIFIED
                        </span>
                        <span style={{ fontSize: '10.5px', color: '#991b1b', marginTop: '2px' }}>
                          {candidate.disqualificationReason}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
