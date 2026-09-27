import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { FreshnessBadge } from '../common/FreshnessBadge';
import { RiskLevel } from '../../types';
import { 
  Filter, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const RiskRadarView: React.FC = () => {
  const { 
    phcNodes, 
    setSelectedPhcId, 
    setSelectedResourceId, 
    setCurrentView,
    selectedRiskFilter,
    setSelectedRiskFilter 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [localSearch, setLocalSearch] = useState<string>('');

  // Collect all inventory risk items across all nodes
  const allRiskItems = phcNodes.flatMap(phc => 
    phc.inventory.map(item => ({
      ...item,
      phcId: phc.id,
      phcName: phc.name,
      district: phc.district,
      catchment: phc.catchmentPopulation,
      dataFreshnessMinutes: phc.dataFreshnessMinutes
    }))
  ).sort((a, b) => {
    const riskPriority: Record<RiskLevel, number> = {
      CRITICAL: 5,
      HIGH: 4,
      ELEVATED: 3,
      WATCHLIST: 2,
      STABLE: 1
    };
    return (riskPriority[b.riskLevel] - riskPriority[a.riskLevel]) || (a.coverageDays - b.coverageDays);
  });

  // Filter items
  const filteredItems = allRiskItems.filter(item => {
    const matchesRisk = selectedRiskFilter === 'ALL' || item.riskLevel === selectedRiskFilter;
    const matchesSearch = item.phcName.toLowerCase().includes(localSearch.toLowerCase()) ||
                          item.resourceName.toLowerCase().includes(localSearch.toLowerCase()) ||
                          item.batchNumber.toLowerCase().includes(localSearch.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      {/* Header Bar */}
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
            Risk Radar Matrix
          </h1>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>What needs immediate clinical and operational attention?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#507e72', fontWeight: 600 }}>
            Active Shortages Under Surveillance:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              border: '1px solid #fca5a5'
            }}
          >
            1 CRITICAL • 2 ELEVATED
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #d4e0da',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Risk Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#507e72', marginRight: '4px' }}>
            Risk Level:
          </span>
          {(['ALL', 'CRITICAL', 'HIGH', 'ELEVATED', 'WATCHLIST', 'STABLE'] as const).map(lvl => {
            const isSelected = selectedRiskFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedRiskFilter(lvl)}
                style={{
                  fontSize: '12px',
                  fontWeight: isSelected ? 800 : 600,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  backgroundColor: isSelected ? '#0f352e' : '#f7f8f6',
                  color: isSelected ? '#ffffff' : '#2b6a5d',
                  border: `1px solid ${isSelected ? '#0f352e' : '#d4e0da'}`
                }}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Local Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#f7f8f6',
              border: '1px solid #d4e0da',
              borderRadius: '6px',
              padding: '5px 10px'
            }}
          >
            <Search size={14} style={{ color: '#768a84' }} />
            <input
              type="text"
              placeholder="Filter by PHC or medicine..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '12.5px',
                color: '#0f352e',
                width: '180px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Critical Highlight Banner if CRITICAL items exist */}
      {filteredItems.some(i => i.riskLevel === 'CRITICAL') && (
        <div
          style={{
            backgroundColor: '#fff7ed',
            border: '1.5px solid #fed7aa',
            borderRadius: '10px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(234, 88, 12, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#ea580c',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#9a3412', marginBottom: '2px' }}>
                PRIORITY ACTION REQUIRED: PHC 184 (Madurantakam Rural)
              </div>
              <div style={{ fontSize: '12.5px', color: '#7c2d12' }}>
                Polyvalent Snake Antivenom depleted to <strong>48 vials</strong> (1.2 days coverage). Surge burn rate 38 vials/day.
                Optimal mutual-aid donor identified: PHC 192 (+400 vials, 42 min transit).
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedPhcId('PHC-184');
              setSelectedResourceId('ASV-POLY');
              setCurrentView('resolve');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '12.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            Review Solution
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Main Risk Table */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #d4e0da',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(15, 53, 46, 0.04)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f7f8f6', borderBottom: '1px solid #d4e0da', fontSize: '11px', color: '#507e72', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 16px' }}>Risk Priority</th>
              <th style={{ padding: '12px 16px' }}>PHC Center &amp; District</th>
              <th style={{ padding: '12px 16px' }}>Resource &amp; Batch</th>
              <th style={{ padding: '12px 16px' }}>Current Stock</th>
              <th style={{ padding: '12px 16px' }}>14-Day Demand</th>
              <th style={{ padding: '12px 16px' }}>Coverage</th>
              <th style={{ padding: '12px 16px' }}>Data Freshness</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => {
              const isCrit = item.riskLevel === 'CRITICAL';
              const isHigh = item.riskLevel === 'HIGH' || item.riskLevel === 'ELEVATED';

              return (
                <tr
                  key={`${item.phcId}-${item.resourceId}`}
                  style={{
                    borderBottom: '1px solid #e5ece8',
                    backgroundColor: isCrit ? '#fef2f2' : isHigh ? '#fffdfa' : '#ffffff',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCrit) e.currentTarget.style.backgroundColor = '#f4f7f5';
                  }}
                  onMouseLeave={(e) => {
                    if (!isCrit) e.currentTarget.style.backgroundColor = isHigh ? '#fffdfa' : '#ffffff';
                  }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <RiskBadge level={item.riskLevel} size="sm" />
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
                      {item.phcName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#768a84' }}>
                      {item.district} • Catchment: {item.catchment.toLocaleString()}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#142421' }}>
                      {item.resourceName}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#507e72' }}>
                      Batch: {item.batchNumber} (Exp: {item.expiryDate})
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: isCrit ? '#dc2626' : '#0f352e' }}>
                      {item.currentStock.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '11px', color: '#768a84', marginLeft: '4px' }}>
                      / {item.safetyThreshold} min
                    </span>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: '#0f352e' }}>
                      {item.predictedDemand14d} units
                    </span>
                    <div style={{ fontSize: '10.5px', color: '#768a84' }}>
                      Burn: {item.dailyBurnRate}/day
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '15px',
                          fontWeight: 800,
                          color: isCrit ? '#dc2626' : isHigh ? '#d97706' : '#16a34a'
                        }}
                      >
                        {item.coverageDays}d
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#768a84' }}>
                        {item.coverageDays <= 2 ? '(Stockout Imminent)' : 'remaining'}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <FreshnessBadge minutesAgo={item.dataFreshnessMinutes} />
                  </td>

                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setSelectedPhcId(item.phcId);
                          setSelectedResourceId(item.resourceId);
                          setCurrentView('phc-workspace');
                        }}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #b2c5bd',
                          color: '#194d43',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                        title="Inspect detailed PHC workspace"
                      >
                        Workspace
                      </button>

                      {isCrit && (
                        <button
                          onClick={() => {
                            setSelectedPhcId(item.phcId);
                            setSelectedResourceId(item.resourceId);
                            setCurrentView('resolve');
                          }}
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '4px 9px',
                            borderRadius: '4px',
                            backgroundColor: '#194d43',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          Resolve
                          <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
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
