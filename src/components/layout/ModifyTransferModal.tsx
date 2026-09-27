import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sliders, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ModifyTransferModal: React.FC = () => {
  const { 
    isModifyModalOpen, 
    setIsModifyModalOpen, 
    activeProposal, 
    modifyProposalQuantity 
  } = useApp();

  const [quantity, setQuantity] = useState<number>(activeProposal.quantityUnits);
  const [notes, setNotes] = useState<string>('');

  if (!isModifyModalOpen) return null;

  // Recalculate preview metrics
  const receiverNewStock = 48 + quantity;
  const receiverNewCoverage = parseFloat((receiverNewStock / 38).toFixed(1));
  const donorNewStock = 1650 - quantity;
  const donorNewCoverage = parseFloat((donorNewStock / 24).toFixed(1));
  const donorBreachesGuardrail = donorNewCoverage < 14;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    modifyProposalQuantity(quantity, notes);
    setIsModifyModalOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modify-transfer-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 53, 46, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsModifyModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(580px, 94vw)',
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1.5px solid #b2c5bd',
          boxShadow: '0 20px 50px rgba(15, 53, 46, 0.25)',
          overflow: 'hidden'
        }}
        className="animate-fade-in"
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e5ece8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fafbf9'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} style={{ color: '#194d43' }} />
            <div>
              <h2 id="modify-transfer-title" style={{ fontSize: '15px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
                Modify Transfer Parameters
              </h2>
              <span style={{ fontSize: '12px', color: '#507e72' }}>
                Proposal #{activeProposal.id} • Human Authority Override
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModifyModalOpen(false)}
            style={{ color: '#768a84', padding: '4px', borderRadius: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ padding: '20px' }}>
          {/* Resource & Route Details */}
          <div
            style={{
              backgroundColor: '#f1f5f3',
              border: '1px solid #d4e0da',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              fontSize: '12.5px',
              lineHeight: 1.5,
              color: '#0f352e'
            }}
          >
            <div><strong>Resource:</strong> {activeProposal.resourceName}</div>
            <div><strong>Donor:</strong> {activeProposal.donorPhcName}</div>
            <div><strong>Receiver:</strong> {activeProposal.receiverPhcName}</div>
          </div>

          {/* Quantity Slider and Input */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="quantity-input" style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
                Transfer Quantity (vials)
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 800, color: '#194d43' }}>
                {quantity} vials
              </span>
            </div>

            <input
              id="quantity-range"
              type="range"
              min="50"
              max="800"
              step="25"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#194d43', cursor: 'pointer' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#768a84', marginTop: '2px' }}>
              <span>50 vials (Min relief)</span>
              <span>400 vials (AI Recommended)</span>
              <span>800 vials (Max donor surplus)</span>
            </div>
          </div>

          {/* Recalculated Impact Preview Card */}
          <div
            style={{
              backgroundColor: donorBreachesGuardrail ? '#fef2f2' : '#f0fdf4',
              border: `1.5px solid ${donorBreachesGuardrail ? '#fca5a5' : '#86efac'}`,
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              {donorBreachesGuardrail ? (
                <ShieldAlert size={16} style={{ color: '#dc2626' }} />
              ) : (
                <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
              )}
              <span style={{ fontSize: '12px', fontWeight: 800, color: donorBreachesGuardrail ? '#991b1b' : '#166534' }}>
                {donorBreachesGuardrail ? 'GUARDRAIL VIOLATION DETECTED' : 'CONSTRAINTS SATISFIED'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#507e72' }}>Receiver (PHC 184) Coverage:</span>
                <div style={{ fontWeight: 800, color: '#0f352e', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                  {receiverNewCoverage} days <span style={{ fontSize: '11px', color: '#16a34a' }}>(+{(receiverNewCoverage - 1.2).toFixed(1)}d)</span>
                </div>
              </div>
              <div>
                <span style={{ color: '#507e72' }}>Donor (PHC 192) Residual:</span>
                <div style={{ fontWeight: 800, color: donorBreachesGuardrail ? '#dc2626' : '#0f352e', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                  {donorNewCoverage} days <span style={{ fontSize: '11px', color: donorBreachesGuardrail ? '#dc2626' : '#507e72' }}>(&gt;14d threshold)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Officer Justification Notes Input */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="notes-input" style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f352e', marginBottom: '6px' }}>
              Officer Rationale / Operational Notes (Mandatory for Audit Trail)
            </label>
            <textarea
              id="notes-input"
              rows={3}
              placeholder="Provide reason for modifying quantity (e.g., local feeder sub-centre stocks reviewed, transport capacity verified)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #b2c5bd',
                fontSize: '13px',
                fontFamily: 'inherit',
                color: '#0f352e',
                outline: 'none'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModifyModalOpen(false)}
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #d4e0da',
                backgroundColor: '#ffffff',
                color: '#507e72',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={donorBreachesGuardrail}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                backgroundColor: donorBreachesGuardrail ? '#d4e0da' : '#194d43',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: donorBreachesGuardrail ? 'not-allowed' : 'pointer'
              }}
            >
              Apply Parameter Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
