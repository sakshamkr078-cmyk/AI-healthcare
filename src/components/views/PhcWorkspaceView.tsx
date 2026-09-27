import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskBadge } from '../common/RiskBadge';
import { FreshnessBadge } from '../common/FreshnessBadge';
import { MetricCard } from '../common/MetricCard';
import { TIME_SERIES_FORECAST_PHC184, RISK_DRIVERS_PHC184 } from '../../data/mockData';
import { 
  Building2, 
  ThermometerSnowflake, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Truck, 
  ArrowRight, 
  Users, 
  Activity, 
  Phone, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const PhcWorkspaceView: React.FC = () => {
  const { 
    selectedPhc, 
    phcNodes, 
    setSelectedPhcId, 
    setCurrentView,
    activeProposal 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'forecast' | 'drivers' | 'infrastructure'>('inventory');

  const criticalItem = selectedPhc.inventory.find(i => i.riskLevel === 'CRITICAL');

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }} className="animate-fade-in">
      {/* Workspace Header with PHC Switcher */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #d4e0da',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '20px',
          boxShadow: '0 1px 4px rgba(15, 53, 46, 0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Building2 size={18} style={{ color: '#194d43' }} />
              {/* PHC Selector */}
              <select
                value={selectedPhc.id}
                onChange={(e) => setSelectedPhcId(e.target.value)}
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#0f352e',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  borderBottom: '2px dashed #b2c5bd',
                  paddingBottom: '2px'
                }}
                aria-label="Select PHC Workspace"
              >
                {phcNodes.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.overallRisk})
                  </option>
                ))}
              </select>
              <RiskBadge level={selectedPhc.overallRisk} size="md" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '12px', color: '#507e72', marginTop: '6px' }}>
              <span><strong>Type:</strong> {selectedPhc.type.replace(/_/g, ' ')}</span>
              <span>•</span>
              <span><strong>Medical Officer:</strong> {selectedPhc.medicalOfficerInCharge}</span>
              <span>•</span>
              <span><strong>Catchment:</strong> {selectedPhc.catchmentPopulation.toLocaleString()} pop ({selectedPhc.bedsCount} beds)</span>
              <span>•</span>
              <span><strong>Transit Route:</strong> {selectedPhc.nearestTransitHighway}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FreshnessBadge minutesAgo={selectedPhc.dataFreshnessMinutes} />
            {selectedPhc.id === 'PHC-184' && (
              <button
                onClick={() => setCurrentView('resolve')}
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '7px 14px',
                  backgroundColor: '#ea580c',
                  color: '#ffffff',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Resolve Deficit
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Vital Snapshot Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: '1px solid #e5ece8'
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#768a84', fontWeight: 600, textTransform: 'uppercase' }}>Daily Footfall</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: '#0f352e' }}>
              {selectedPhc.dailyPatientFootfall} <span style={{ fontSize: '11px', color: '#dc2626' }}>(+240% surge)</span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#768a84', fontWeight: 600, textTransform: 'uppercase' }}>Surge Condition</span>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ea580c', marginTop: '2px' }}>
              {selectedPhc.surgeStatus.replace(/_/g, ' ')}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#768a84', fontWeight: 600, textTransform: 'uppercase' }}>Edge Connectivity</span>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
              {selectedPhc.networkConnectionStatus.replace(/_/g, ' ')}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#768a84', fontWeight: 600, textTransform: 'uppercase' }}>Emergency Reserve</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: criticalItem ? '#dc2626' : '#16a34a' }}>
              {criticalItem ? `${criticalItem.coverageDays} Days Remaining` : 'Adequate'}
            </div>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid #d4e0da',
          marginBottom: '20px'
        }}
      >
        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'inventory' ? 800 : 600,
            borderBottom: activeTab === 'inventory' ? '2.5px solid #194d43' : '2.5px solid transparent',
            color: activeTab === 'inventory' ? '#0f352e' : '#507e72',
            backgroundColor: 'transparent'
          }}
        >
          1. Current Inventory &amp; Batches ({selectedPhc.inventory.length})
        </button>

        <button
          onClick={() => setActiveTab('forecast')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'forecast' ? 800 : 600,
            borderBottom: activeTab === 'forecast' ? '2.5px solid #194d43' : '2.5px solid transparent',
            color: activeTab === 'forecast' ? '#0f352e' : '#507e72',
            backgroundColor: 'transparent'
          }}
        >
          2. Demand Forecast &amp; Depletion Curve
        </button>

        <button
          onClick={() => setActiveTab('drivers')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'drivers' ? 800 : 600,
            borderBottom: activeTab === 'drivers' ? '2.5px solid #194d43' : '2.5px solid transparent',
            color: activeTab === 'drivers' ? '#0f352e' : '#507e72',
            backgroundColor: 'transparent'
          }}
        >
          3. Root Cause Risk Drivers
        </button>

        <button
          onClick={() => setActiveTab('infrastructure')}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: activeTab === 'infrastructure' ? 800 : 600,
            borderBottom: activeTab === 'infrastructure' ? '2.5px solid #194d43' : '2.5px solid transparent',
            color: activeTab === 'infrastructure' ? '#0f352e' : '#507e72',
            backgroundColor: 'transparent'
          }}
        >
          4. Operational Context &amp; Cold-Chain
        </button>
      </div>

      {/* TAB 1: Inventory & Batches */}
      {activeTab === 'inventory' && (
        <div className="animate-fade-in">
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
                <tr style={{ backgroundColor: '#f7f8f6', borderBottom: '1px solid #d4e0da', fontSize: '11px', color: '#507e72', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Medicine / Supply</th>
                  <th style={{ padding: '12px 16px' }}>Risk Status</th>
                  <th style={{ padding: '12px 16px' }}>Stock on Hand</th>
                  <th style={{ padding: '12px 16px' }}>Safety Min</th>
                  <th style={{ padding: '12px 16px' }}>Daily Burn</th>
                  <th style={{ padding: '12px 16px' }}>Coverage</th>
                  <th style={{ padding: '12px 16px' }}>Cold Chain Status</th>
                  <th style={{ padding: '12px 16px' }}>Batch &amp; Expiry</th>
                </tr>
              </thead>
              <tbody>
                {selectedPhc.inventory.map(item => {
                  const isCrit = item.riskLevel === 'CRITICAL';
                  return (
                    <tr key={item.resourceId} style={{ borderBottom: '1px solid #e5ece8', backgroundColor: isCrit ? '#fef2f2' : '#ffffff' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>{item.resourceName}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#768a84' }}>ID: {item.resourceId}</div>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <RiskBadge level={item.riskLevel} size="sm" />
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 800, color: isCrit ? '#dc2626' : '#0f352e' }}>
                          {item.currentStock}
                        </span>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#507e72' }}>
                          {item.safetyThreshold}
                        </span>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#0f352e', fontWeight: 600 }}>
                          {item.dailyBurnRate}/day
                        </span>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 800, color: isCrit ? '#dc2626' : '#16a34a' }}>
                          {item.coverageDays} Days
                        </span>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <ThermometerSnowflake size={14} style={{ color: item.tempStatus === 'WARNING' ? '#ea580c' : '#16a34a' }} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>
                            {item.storageTempC}°C
                          </span>
                          <span style={{ fontSize: '10px', color: item.tempStatus === 'WARNING' ? '#ea580c' : '#16a34a', fontWeight: 700 }}>
                            ({item.tempStatus})
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#0f352e' }}>{item.batchNumber}</div>
                        <div style={{ fontSize: '11px', color: '#768a84' }}>Exp: {item.expiryDate}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Forecast & Demand */}
      {activeTab === 'forecast' && (
        <div className="animate-fade-in">
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d4e0da',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 1px 4px rgba(15, 53, 46, 0.04)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
                  14-Day Demand &amp; Stock Depletion Curve: Polyvalent Snake Antivenom
                </h3>
                <span style={{ fontSize: '12px', color: '#507e72' }}>
                  Federated Model #412 Inference • Projected Stockout Horizon: <strong>Day +2 (30.4 Hours)</strong>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '12px', height: '3px', backgroundColor: '#dc2626' }} /> Actual Stock on Hand
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '12px', height: '3px', backgroundColor: '#194d43', borderTop: '1px dashed' }} /> Forecasted Daily Demand
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '12px', height: '10px', backgroundColor: 'rgba(25, 77, 67, 0.12)' }} /> 90% Confidence Interval
                </span>
              </div>
            </div>

            {/* SVG Forecast Chart */}
            <svg viewBox="0 0 860 260" style={{ width: '100%', height: '260px', display: 'block' }}>
              {/* Background Grid Lines */}
              {[0, 50, 100, 150, 200, 250].map((val, idx) => {
                const y = 220 - (val * 0.7);
                return (
                  <g key={idx}>
                    <line x1="50" y1={y} x2="840" y2={y} stroke="#e5ece8" strokeWidth="1" />
                    <text x="40" y={y + 4} fill="#768a84" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Confidence Interval Polygon */}
              <polygon
                points="
                  50,205 110,202 170,199 230,193 290,190 350,192 410,190
                  470,189 530,188 590,191 650,193 710,195 770,197 830,199
                  830,215 770,214 710,212 650,210 590,208 530,205 470,203
                  410,201 350,203 290,205 230,207 170,209 110,211 50,213
                "
                fill="rgba(25, 77, 67, 0.12)"
              />

              {/* Historical Stock Depletion Line (Red) */}
              <polyline
                points="50,24 110,42 170,66 230,94 290,125 350,160 410,186"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Projected Zero Stock Line (Dashed Red) */}
              <line x1="410" y1="186" x2="530" y2="220" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 4" />
              <line x1="530" y1="220" x2="830" y2="220" stroke="#dc2626" strokeWidth="2" strokeDasharray="2 2" />

              {/* Projected Stockout Warning Pill */}
              <g transform="translate(480, 160)">
                <rect width="130" height="26" rx="4" fill="#fee2e2" stroke="#fca5a5" />
                <text x="65" y="17" fill="#991b1b" fontSize="10.5" fontWeight="800" textAnchor="middle">
                  STOCKOUT HORIZON
                </text>
              </g>

              {/* Demand Forecast Line (Teal dashed) */}
              <polyline
                points="50,209 110,207 170,204 230,199 290,196 350,197 410,195 470,194 530,193 590,196 650,198 710,200 770,202 830,204"
                fill="none"
                stroke="#194d43"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />

              {/* X Axis Labels */}
              {TIME_SERIES_FORECAST_PHC184.map((pt, idx) => {
                const x = 50 + (idx * 60);
                return (
                  <text key={idx} x={x} y="245" fill={pt.day === 'Today' ? '#dc2626' : '#507e72'} fontSize="10" fontWeight={pt.day === 'Today' ? '800' : '500'} textAnchor="middle">
                    {pt.day}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* TAB 3: Risk Drivers Attribution */}
      {activeTab === 'drivers' && (
        <div className="animate-fade-in">
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d4e0da',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 1px 4px rgba(15, 53, 46, 0.04)'
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e', marginBottom: '4px' }}>
              Decomposed Risk Drivers &amp; Feature Attribution (SHAP-Style)
            </h3>
            <p style={{ fontSize: '12.5px', color: '#507e72', marginBottom: '16px' }}>
              Why is PHC 184 experiencing an acute stockout vulnerability? Factors evaluated across local epidemiology, weather signals, and logistics:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {RISK_DRIVERS_PHC184.map((driver, idx) => (
                <div key={idx} style={{ backgroundColor: '#fafbf9', border: '1px solid #e5ece8', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f352e' }}>
                      {driver.driver}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: '#ea580c' }}>
                      {driver.impactPercentage}% Attribution
                    </span>
                  </div>

                  {/* Percentage Progress Bar */}
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e5ece8', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${driver.impactPercentage}%`, height: '100%', backgroundColor: idx === 0 ? '#dc2626' : idx === 1 ? '#ea580c' : '#194d43' }} />
                  </div>

                  <div style={{ fontSize: '12px', color: '#475a55', lineHeight: 1.4 }}>
                    <strong>Evidence Telemetry:</strong> {driver.evidenceMetric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Operational Infrastructure */}
      {activeTab === 'infrastructure' && (
        <div className="animate-fade-in">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}
          >
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e', marginBottom: '10px' }}>
                Cold Chain Equipment &amp; Storage
              </div>
              <ul style={{ listStyle: 'none', fontSize: '12px', color: '#475a55', lineHeight: 2 }}>
                <li>• <strong>Primary ILR Unit:</strong> Vestfrost VLS 024 (Safe range 2–8°C, current 4.8°C)</li>
                <li>• <strong>Backup Solar / Battery:</strong> 48V Li-ion inverter active (100% capacity)</li>
                <li>• <strong>Standby Diesel Generator:</strong> 15 kVA (fuel tank at 84%, auto-switch verified)</li>
                <li>• <strong>Continuous Datalogger:</strong> LogTag TRED30-16R IoT sync online</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e', marginBottom: '10px' }}>
                Catchment &amp; Staffing Capacity
              </div>
              <ul style={{ listStyle: 'none', fontSize: '12px', color: '#475a55', lineHeight: 2 }}>
                <li>• <strong>Medical Officers:</strong> 2 on active 24/7 duty roster</li>
                <li>• <strong>Staff Nurses:</strong> 4 on duty (trained in Anti-Snake Venom protocol)</li>
                <li>• <strong>Feeder Sub-Centres (HSCs):</strong> 5 rural sub-centres within 18 km</li>
                <li>• <strong>Nearest Trauma Hospital:</strong> Chengalpattu Govt Medical College (32 km via NH-32)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
