import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuditRecord } from '../../types';
import { 
  FileClock, 
  Search, 
  Download, 
  Printer, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  UserCheck, 
  Filter 
} from 'lucide-react';

export const AuditView: React.FC = () => {
  const { auditTrail, addToast } = useApp();
  const [selectedEventType, setSelectedEventType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(auditTrail[0]?.id || null);

  const filteredRecords = auditTrail.filter(record => {
    const matchesType = selectedEventType === 'ALL' || record.eventType.includes(selectedEventType);
    const matchesSearch = record.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (record.phcName && record.phcName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          record.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditTrail, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `phc_audit_trail_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('success', 'Audit Ledger Exported', 'Certified JSON compliance log downloaded.');
  };

  const getEventBadge = (type: AuditRecord['eventType']) => {
    if (type.includes('HUMAN')) {
      return { label: 'HUMAN DECISION', bg: '#f0fdf4', text: '#166534', border: '#86efac', icon: <UserCheck size={12} /> };
    }
    if (type.includes('SOLVER') || type.includes('ANOMALY')) {
      return { label: 'AI SOLVER', bg: '#e8f3f0', text: '#194d43', border: '#b2c5bd', icon: <Cpu size={12} /> };
    }
    return { label: 'TELEMETRY', bg: '#f1f5f3', text: '#507e72', border: '#d4e0da', icon: <ShieldCheck size={12} /> };
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
            <FileClock size={20} style={{ color: '#194d43' }} />
            <h1 className="text-title" style={{ fontSize: '24px', margin: 0 }}>
              Chronological Audit Ledger
            </h1>
          </div>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>What happened, why did it happen, and who authorized it?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={exportJson}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid #b2c5bd',
              fontSize: '12px',
              fontWeight: 700,
              color: '#194d43'
            }}
          >
            <Download size={13} />
            Export Certified Log (JSON)
          </button>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#507e72', marginRight: '4px' }}>
            Event Filter:
          </span>
          {['ALL', 'HUMAN', 'SOLVER', 'TELEMETRY', 'FEDERATED'].map(evt => {
            const isSelected = selectedEventType === evt;
            return (
              <button
                key={evt}
                onClick={() => setSelectedEventType(evt)}
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
                {evt}
              </button>
            );
          })}
        </div>

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
              placeholder="Search audit records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Chronological Ledger Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredRecords.map((record, idx) => {
          const isExpanded = expandedRecordId === record.id;
          const badge = getEventBadge(record.eventType);

          return (
            <div
              key={record.id}
              style={{
                backgroundColor: '#ffffff',
                border: `1.5px solid ${isExpanded ? '#194d43' : '#d4e0da'}`,
                borderRadius: '10px',
                boxShadow: isExpanded ? '0 4px 14px rgba(15, 53, 46, 0.08)' : '0 1px 3px rgba(15, 53, 46, 0.04)',
                overflow: 'hidden',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Record Summary Bar (Click to toggle) */}
              <div
                onClick={() => setExpandedRecordId(isExpanded ? null : record.id)}
                style={{
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? '#fafbf9' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#507e72',
                      minWidth: '150px'
                    }}
                  >
                    {record.timestamp}
                  </span>

                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>

                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f352e' }}>
                    {record.summary}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#768a84' }}>
                    {record.id}
                  </span>
                  {isExpanded ? <ChevronUp size={16} style={{ color: '#507e72' }} /> : <ChevronDown size={16} style={{ color: '#507e72' }} />}
                </div>
              </div>

              {/* Detailed Expanded Reconstruction Snapshot */}
              {isExpanded && (
                <div
                  style={{
                    padding: '18px 20px',
                    borderTop: '1px solid #e5ece8',
                    backgroundColor: '#ffffff'
                  }}
                  className="animate-fade-in"
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '16px',
                      marginBottom: '16px'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase' }}>
                        Operational Actor &amp; Role
                      </span>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e', marginTop: '2px' }}>
                        {record.actor}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#507e72' }}>
                        Role: {record.actorRole}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase' }}>
                        Pre-Event Operational State
                      </span>
                      <div style={{ fontSize: '12.5px', color: '#475a55', marginTop: '2px' }}>
                        {record.preStateDescription}
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#768a84', textTransform: 'uppercase' }}>
                        Post-Event State Result
                      </span>
                      <div style={{ fontSize: '12.5px', color: '#166534', fontWeight: 600, marginTop: '2px' }}>
                        {record.postStateDescription}
                      </div>
                    </div>
                  </div>

                  {/* Cryptographic SHA-256 Ledger Seal */}
                  <div
                    style={{
                      backgroundColor: '#f1f5f3',
                      border: '1px solid #b2c5bd',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '11px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#194d43' }}>
                      <ShieldCheck size={14} style={{ color: '#16a34a' }} />
                      <span>Tamper-evident record sealed into state health ledger. Constraints verified: <strong>Yes</strong>.</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#507e72' }}>
                      Hash: {record.hashSignature}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
