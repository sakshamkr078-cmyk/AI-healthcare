import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FreshnessBadge } from '../common/FreshnessBadge';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Sliders, 
  Truck, 
  FileText, 
  ArrowRight, 
  AlertCircle,
  Stamp,
  UserCheck
} from 'lucide-react';

export const HumanApprovalView: React.FC = () => {
  const { 
    activeProposal, 
    approveProposal, 
    rejectProposal, 
    setIsModifyModalOpen, 
    setCurrentView,
    currentUserRole 
  } = useApp();

  const [officerNotes, setOfficerNotes] = useState<string>('');
  const [rejectReason, setRejectReason] = useState<string>('Alternative local supply sourced');
  const [showRejectForm, setShowRejectForm] = useState<boolean>(false);

  const isApproved = activeProposal.status === 'APPROVED';
  const isRejected = activeProposal.status === 'REJECTED';

  const handleApprove = () => {
    approveProposal(officerNotes || 'Approved by District CMO following cold-chain and highway route clearance.');
  };

  const handleReject = () => {
    rejectProposal(rejectReason, officerNotes);
    setShowRejectForm(false);
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
            <CheckSquare size={20} style={{ color: '#194d43' }} />
            <h1 className="text-title" style={{ fontSize: '24px', margin: 0 }}>
              Human Decision Console
            </h1>
          </div>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>Do I approve this inter-PHC resource transfer action?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FreshnessBadge minutesAgo={4} source="RFID & Telemetry Verified" />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: isApproved ? '#f0fdf4' : isRejected ? '#fef2f2' : '#fff7ed',
              color: isApproved ? '#166534' : isRejected ? '#991b1b' : '#9a3412',
              border: `1.5px solid ${isApproved ? '#86efac' : isRejected ? '#fca5a5' : '#fed7aa'}`
            }}
          >
            APPROVAL STATE: {activeProposal.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Main Focus Decision Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1.5px solid #b2c5bd',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(15, 53, 46, 0.08)'
        }}
      >
        {/* State Banner if already Approved */}
        {isApproved && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={24} style={{ color: '#16a34a' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#166534' }}>
                  ACTION AUTHORIZED — E-WAYBILL ISSUED
                </div>
                <div style={{ fontSize: '12px', color: '#15803d' }}>
                  E-Waybill No: <strong>{activeProposal.eWaybillNumber}</strong> • Authorized by {activeProposal.humanReviewer} • Dispatch in progress
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('audit')}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#166534',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Inspect Audit Entry
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* State Banner if Rejected */}
        {isRejected && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1.5px solid #fca5a5',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <XCircle size={24} style={{ color: '#dc2626' }} />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#991b1b' }}>
                TRANSFER PROPOSAL DECLINED
              </div>
              <div style={{ fontSize: '12px', color: '#7f1d1d' }}>
                Stated Reason: &ldquo;{activeProposal.rejectionReason}&rdquo;. Recorded in tamper-evident audit ledger.
              </div>
            </div>
          </div>
        )}

        {/* Formal Transfer Order Header */}
        <div style={{ borderBottom: '1px solid #e5ece8', paddingBottom: '16px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#507e72' }}>
                TAMIL NADU HEALTH SYSTEMS PROJECT • INTER-PHC RELIEF VOUCHER
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f352e', margin: '2px 0 0 0' }}>
                Medical Transfer Order #{activeProposal.id}
              </h2>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#507e72' }}>
              Created: 28-Sep-2026 00:54:12 IST
            </div>
          </div>
        </div>

        {/* Transfer Specifications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}
        >
          {/* Box 1: Resource & Batch */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#507e72', textTransform: 'uppercase' }}>
              Allocated Cargo
            </span>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', marginTop: '4px' }}>
              {activeProposal.resourceName}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 800, color: '#194d43', marginTop: '6px' }}>
              {activeProposal.quantityUnits} Vials
            </div>
            <div style={{ fontSize: '11px', color: '#507e72', marginTop: '4px' }}>
              Batch: ASV-26-09B • Exp: 2028-04 • Temp: 2°C – 8°C
            </div>
          </div>

          {/* Box 2: Consignor (Donor) */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>
              Consignor (Donor Center)
            </span>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', marginTop: '4px' }}>
              {activeProposal.donorPhcName}
            </div>
            <div style={{ fontSize: '12px', color: '#475a55', marginTop: '6px' }}>
              Dr. V. Malathi, MD (In-Charge)
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
              Residual Stock Post-Transfer: 1,250 vials (52.0 Days)
            </div>
          </div>

          {/* Box 3: Consignee (Receiver) */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
              Consignee (Receiving Center)
            </span>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', marginTop: '4px' }}>
              {activeProposal.receiverPhcName}
            </div>
            <div style={{ fontSize: '12px', color: '#475a55', marginTop: '6px' }}>
              Dr. K. Senthil Kumar, MBBS (In-Charge)
            </div>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
              Stock moves 48 → 448 vials (1.2d → 11.7 Days)
            </div>
          </div>

          {/* Box 4: Transit Logistics */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '8px', padding: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#507e72', textTransform: 'uppercase' }}>
              Cold Chain Logistics
            </span>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e', marginTop: '4px' }}>
              {activeProposal.transitVehicleType}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#194d43', marginTop: '4px' }}>
              Vehicle: {activeProposal.vehicleRegNumber}
            </div>
            <div style={{ fontSize: '11px', color: '#507e72', marginTop: '4px' }}>
              Datalogger: {activeProposal.tempLoggerTag} • ETA: 42 mins
            </div>
          </div>
        </div>

        {/* Expected Impact Summary Bar */}
        <div
          style={{
            backgroundColor: '#e8f3f0',
            border: '1px solid #b2c5bd',
            borderRadius: '8px',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: '#16a34a' }} />
            <div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e' }}>
                Mathematical Impact: Stockout Risk Completely Averted
              </span>
              <div style={{ fontSize: '12px', color: '#507e72' }}>
                Receiving PHC gains 10.5 days safety buffer; donor retains 52 days; 0 collateral shortages.
              </div>
            </div>
          </div>

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
              gap: '4px'
            }}
          >
            <Sliders size={13} />
            Modify Quantity
          </button>
        </div>

        {/* Officer Rationale Input (if not approved yet) */}
        {!isApproved && !isRejected && (
          <div style={{ marginBottom: '22px' }}>
            <label
              htmlFor="officer-justification"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 700,
                color: '#0f352e',
                marginBottom: '6px'
              }}
            >
              Authorizing Officer Rationale &amp; Endorsement (Mandatory for Tamper-Evident Ledger)
            </label>
            <textarea
              id="officer-justification"
              rows={2}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="e.g., Reviewed NH-32 road passability with Chengalpattu Traffic Police; verified donor ILR cold chain status..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #b2c5bd',
                fontSize: '13px',
                fontFamily: 'inherit',
                color: '#0f352e',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Primary Decision Action Controls */}
        {!isApproved && !isRejected && (
          <div>
            {!showRejectForm ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setShowRejectForm(true)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '8px',
                      border: '1.5px solid #fca5a5',
                      backgroundColor: '#ffffff',
                      color: '#991b1b',
                      fontSize: '13px',
                      fontWeight: 700
                    }}
                  >
                    Reject Proposal
                  </button>

                  <button
                    onClick={() => setCurrentView('ai-explanation')}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid #d4e0da',
                      backgroundColor: '#f7f8f6',
                      color: '#507e72',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Review Evidence Again
                  </button>
                </div>

                <button
                  onClick={handleApprove}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '8px',
                    backgroundColor: '#194d43',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(25, 77, 67, 0.3)'
                  }}
                >
                  <CheckCircle2 size={18} />
                  APPROVE &amp; ISSUE E-WAYBILL
                </button>
              </div>
            ) : (
              /* Rejection Reason Form */
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1.5px solid #fca5a5',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '10px'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#991b1b', marginBottom: '8px' }}>
                  Specify Rejection Reason for Official Health Records
                </div>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid #fca5a5',
                    fontSize: '13px',
                    marginBottom: '10px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="Alternative local supply sourced">Alternative local supply sourced from private pharmacy</option>
                  <option value="Road impassability reported by local inspector">Road impassability reported by local inspector</option>
                  <option value="Donor emergency surge anticipated">Donor emergency surge anticipated locally</option>
                  <option value="Quantity adjustment required">Quantity adjustment required</option>
                </select>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    onClick={() => setShowRejectForm(false)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #d4e0da',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 800
                    }}
                  >
                    Confirm Rejection &amp; Log
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
