import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  ArrowRight, 
  Compass, 
  FileText,
  Lock
} from 'lucide-react';

export const AiExplanationView: React.FC = () => {
  const { activeProposal, setCurrentView } = useApp();

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
            <BrainCircuit size={20} style={{ color: '#088fa6' }} />
            <h1 className="text-title" style={{ fontSize: '24px', margin: 0 }}>
              AI Analytical Explanation Layer
            </h1>
          </div>
          <p className="text-subtitle" style={{ marginTop: '2px' }}>
            Primary Question: <strong>Why is this specific transfer recommendation being made?</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#e6f6f9',
              color: '#088fa6',
              border: '1px solid #bce5ec',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Lock size={12} />
            Differential Privacy Certified (\u03b5 = 0.82)
          </span>
        </div>
      </div>

      {/* Analyst Role Note Banner */}
      <div
        style={{
          backgroundColor: '#f2f8f6',
          border: '1px solid #b2c5bd',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#194d43',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Info size={16} />
        </div>
        <div style={{ fontSize: '13px', color: '#142421', lineHeight: 1.4 }}>
          <strong>Analytical Companion:</strong> This system does not replace clinician judgment. Below is the transparent chain of evidence, mathematical optimization constraints, assumptions, and known limitations provided to support your decision.
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '20px',
          alignItems: 'start'
        }}
      >
        {/* Left Column: 4-Step Deductive Reasoning Chain */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
            Structured Deductive Reasoning Chain
          </h2>

          {/* Step 1 */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#e8f3f0', color: '#194d43' }}>
                STAGE 1
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e' }}>
                Vulnerability Horizon &amp; Clinical Criticality
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475a55', lineHeight: 1.45, marginBottom: '8px' }}>
              Polyvalent Snake Antivenom at <strong>PHC 184 (Madurantakam Rural)</strong> is currently at 48 vials. Historical burn rate (18/day) was overwhelmed by unseasonal monsoon rains (+310mm) and paddy field submergence, raising daily admissions to 38/day.
            </p>
            <div style={{ fontSize: '12px', backgroundColor: '#fafbf9', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e5ece8', color: '#0f352e' }}>
              <strong>Deduction:</strong> At 38 vials/day, zero stock is reached in 30.4 hours. Antivenom is a Tier 1 Life-Saving medicine; delaying intervention past 24 hours creates unacceptable mortality hazard.
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#e8f3f0', color: '#194d43' }}>
                STAGE 2
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e' }}>
                Candidate Filtering &amp; Donor Inviolability
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475a55', lineHeight: 1.45, marginBottom: '8px' }}>
              The solver surveyed all 28 network nodes. 24 centers were excluded due to lack of surplus. <strong>PHC 202 (Tirukalukundram)</strong> was near (18.2 km) with 350 vials, but transferring 400 or even 200 vials would reduce its local coverage to 5.8 days, triggering a secondary emergency.
            </p>
            <div style={{ fontSize: '12px', backgroundColor: '#fafbf9', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e5ece8', color: '#0f352e' }}>
              <strong>Deduction:</strong> PHC 192 (Chengalpattu Central) possesses 1,650 vials (68.7 days). Deducting 400 vials leaves 1,250 vials (52.0 days), well above the inviolable 14-day local emergency reserve.
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#e8f3f0', color: '#194d43' }}>
                STAGE 3
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e' }}>
                Corridor Viability &amp; Cold-Chain Preservation
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475a55', lineHeight: 1.45, marginBottom: '8px' }}>
              Transit via State Highway 118 was rejected due to waterlogging at the Palar River causeway. The route utilizes National Highway NH-32 (Chengalpattu to Madurantakam toll), an elevated 4-lane arterial road with 100% passability.
            </p>
            <div style={{ fontSize: '12px', backgroundColor: '#fafbf9', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e5ece8', color: '#0f352e' }}>
              <strong>Deduction:</strong> Estimated transit time is 42 minutes, easily satisfying the 120-minute refrigerated van cold-chain SLA (2°C – 8°C).
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#e8f3f0', color: '#194d43' }}>
                STAGE 4
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e' }}>
                Quantity Calibration (+400 Vials)
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475a55', lineHeight: 1.45, marginBottom: '8px' }}>
              At projected surge demand (38 vials/day), 400 vials provides exactly <strong>10.5 days of surge protection</strong>, bridging the gap until the central state depot regular shipment arrives on October 4th.
            </p>
            <div style={{ fontSize: '12px', backgroundColor: '#fafbf9', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e5ece8', color: '#0f352e' }}>
              <strong>Deduction:</strong> Post-transfer receiver coverage reaches 11.7 days; donor coverage remains at 52.0 days. Equilibrium achieved.
            </div>
          </div>
        </div>

        {/* Right Column: Constraints, Assumptions, Limitations & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Strict Constraints Verified */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #d4e0da', borderRadius: '10px', padding: '18px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f352e', marginBottom: '12px' }}>
              Operational Constraints Checked
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeProposal.constraintsVerified.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                  <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f352e' }}>{c.name}</div>
                    <div style={{ color: '#507e72' }}>{c.description}</div>
                    <div style={{ color: '#16a34a', fontWeight: 600, fontSize: '11px', marginTop: '2px' }}>
                      Margin: {c.margin}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Assumptions */}
          <div style={{ backgroundColor: '#fafbf9', border: '1px solid #d4e0da', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <FileText size={15} style={{ color: '#507e72' }} />
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#0f352e', margin: 0 }}>
                Explicit Assumptions
              </h3>
            </div>
            <ul style={{ listStyle: 'none', fontSize: '11.5px', color: '#475a55', lineHeight: 1.8 }}>
              <li>1. Continuous active RFID datalogger maintains 2°C–8°C.</li>
              <li>2. NH-32 Madurantakam toll bypass remains water-free.</li>
              <li>3. Feeder sub-centres continue triaging mild bites locally.</li>
            </ul>
          </div>

          {/* Identified Limitations */}
          <div style={{ backgroundColor: '#fffbfb', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <AlertTriangle size={15} style={{ color: '#dc2626' }} />
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#991b1b', margin: 0 }}>
                Known Limitations
              </h3>
            </div>
            <p style={{ fontSize: '11.5px', color: '#7f1d1d', lineHeight: 1.45 }}>
              Model does not predict flash flooding exceeding +500mm rainfall. If NH-32 experiences unexpected washouts, transit van routing must be rerouted through Chengalpattu-Tirukalukundram corridor with manual police escort.
            </p>
          </div>

          {/* Direct CTA to Human Approval */}
          <div
            style={{
              backgroundColor: '#194d43',
              borderRadius: '10px',
              padding: '18px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 800 }}>
              Evidence Reviewed?
            </div>
            <p style={{ fontSize: '12px', opacity: 0.9, lineHeight: 1.4 }}>
              The algorithm cannot dispatch resources independently. A human decision-maker must authenticate this action.
            </p>
            <button
              onClick={() => setCurrentView('human-approval')}
              style={{
                padding: '10px 16px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#194d43',
                fontSize: '13px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              Open Human Decision Console
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
