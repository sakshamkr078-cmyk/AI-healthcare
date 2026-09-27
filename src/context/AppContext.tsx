import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  ScreenView, 
  UserRole, 
  PHCNode, 
  TransferProposal, 
  AuditRecord, 
  NetworkAlert,
  RiskLevel,
  CandidateDonor 
} from '../types';
import { 
  PHC_NETWORK_NODES, 
  INITIAL_TRANSFER_PROPOSAL, 
  INITIAL_AUDIT_TRAIL, 
  NETWORK_ALERTS,
  CANDIDATE_DONORS_FOR_PHC184 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description?: string;
  timestamp: string;
}

interface AppContextType {
  currentView: ScreenView;
  setCurrentView: (view: ScreenView) => void;
  selectedPhcId: string;
  setSelectedPhcId: (id: string) => void;
  selectedPhc: PHCNode;
  selectedResourceId: string;
  setSelectedResourceId: (id: string) => void;
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  isEmergencyMode: boolean;
  toggleEmergencyMode: () => void;
  phcNodes: PHCNode[];
  activeProposal: TransferProposal;
  candidateDonors: CandidateDonor[];
  auditTrail: AuditRecord[];
  alerts: NetworkAlert[];
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, description?: string) => void;
  dismissToast: (id: string) => void;
  isHubOpen: boolean;
  toggleHub: () => void;
  closeHub: () => void;
  isPaletteOpen: boolean;
  setIsPaletteOpen: (open: boolean) => void;
  isModifyModalOpen: boolean;
  setIsModifyModalOpen: (open: boolean) => void;
  
  // Interactive Decision Actions
  approveProposal: (notes?: string) => void;
  rejectProposal: (reason: string, notes?: string) => void;
  modifyProposalQuantity: (newQty: number, notes?: string) => void;
  reRunSolver: () => void;
  refreshTelemetry: () => void;
  
  // Global Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDistrictFilter: string;
  setSelectedDistrictFilter: (district: string) => void;
  selectedRiskFilter: RiskLevel | 'ALL';
  setSelectedRiskFilter: (risk: RiskLevel | 'ALL') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ScreenView>('network-pulse');
  const [selectedPhcId, setSelectedPhcId] = useState<string>('PHC-184');
  const [selectedResourceId, setSelectedResourceId] = useState<string>('ASV-POLY');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('DISTRICT_OFFICER');
  const [isEmergencyMode, setIsEmergencyMode] = useState<boolean>(false);
  const [phcNodes, setPhcNodes] = useState<PHCNode[]>(PHC_NETWORK_NODES);
  const [activeProposal, setActiveProposal] = useState<TransferProposal>(INITIAL_TRANSFER_PROPOSAL);
  const [auditTrail, setAuditTrail] = useState<AuditRecord[]>(INITIAL_AUDIT_TRAIL);
  const [alerts, setAlerts] = useState<NetworkAlert[]>(NETWORK_ALERTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHubOpen, setIsHubOpen] = useState<boolean>(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>('ALL');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<RiskLevel | 'ALL'>('ALL');

  // Selected PHC object lookup
  const selectedPhc = phcNodes.find(p => p.id === selectedPhcId) || phcNodes[0];

  const addToast = (type: ToastMessage['type'], title: string, description?: string) => {
    const id = 't-' + Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      id,
      type,
      title,
      description,
      timestamp: 'Just now'
    };
    setToasts(prev => [newToast, ...prev].slice(0, 4));
    setTimeout(() => {
      dismissToast(id);
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleEmergencyMode = () => {
    setIsEmergencyMode(prev => {
      const next = !prev;
      if (next) {
        addToast('error', 'EMERGENCY PROTOCOL ACTIVATED', 'Priority green-corridors and surge allocation routines engaged across all 28 PHC nodes.');
      } else {
        addToast('info', 'Standard Operations Resumed', 'Emergency mutual-aid surge override deactivated.');
      }
      return next;
    });
  };

  const toggleHub = () => setIsHubOpen(prev => !prev);
  const closeHub = () => setIsHubOpen(false);

  // Keyboard shortcut listener: Ctrl+K or Cmd+K opens Command Palette; Esc closes hub/palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsHubOpen(false);
        setIsPaletteOpen(false);
        setIsModifyModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // APPROVE PROPOSAL
  const approveProposal = (notes?: string) => {
    const approvalTime = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const eWaybill = 'EWB-TN-2026-' + Math.floor(100000 + Math.random() * 900000);

    setActiveProposal(prev => ({
      ...prev,
      status: 'APPROVED',
      humanReviewer: currentUserRole === 'DISTRICT_OFFICER' ? 'Dr. Anita Sharma (CMO)' : 'Rajesh Verma (Ops)',
      humanReviewTimestamp: approvalTime,
      humanReviewNotes: notes || 'Approved following cold-chain verification and NH-32 clear report.',
      eWaybillNumber: eWaybill
    }));

    // Update receiver inventory in live state
    setPhcNodes(prev => prev.map(phc => {
      if (phc.id === activeProposal.receiverPhcId) {
        return {
          ...phc,
          overallRisk: 'WATCHLIST', // Downgraded from CRITICAL!
          inventory: phc.inventory.map(item => {
            if (item.resourceId === activeProposal.resourceId) {
              const updatedStock = item.currentStock + activeProposal.quantityUnits;
              return {
                ...item,
                currentStock: updatedStock,
                coverageDays: parseFloat((updatedStock / item.dailyBurnRate).toFixed(1)),
                riskLevel: 'WATCHLIST'
              };
            }
            return item;
          })
        };
      }
      if (phc.id === activeProposal.donorPhcId) {
        return {
          ...phc,
          inventory: phc.inventory.map(item => {
            if (item.resourceId === activeProposal.resourceId) {
              const updatedStock = item.currentStock - activeProposal.quantityUnits;
              return {
                ...item,
                currentStock: updatedStock,
                coverageDays: parseFloat((updatedStock / item.dailyBurnRate).toFixed(1))
              };
            }
            return item;
          })
        };
      }
      return phc;
    }));

    // Append to immutable audit trail
    const newAudit: AuditRecord = {
      id: 'AUD-' + Math.floor(10000 + Math.random() * 90000),
      timestamp: formattedDate,
      isoTime: approvalTime,
      eventType: 'HUMAN_DECISION_APPROVED',
      phcId: activeProposal.receiverPhcId,
      phcName: activeProposal.receiverPhcName,
      resourceId: activeProposal.resourceId,
      actor: currentUserRole === 'DISTRICT_OFFICER' ? 'Dr. Anita Sharma (District CMO)' : 'Human Operational Officer',
      actorRole: currentUserRole,
      summary: `APPROVED TRANSFER: Authorized dispatch of ${activeProposal.quantityUnits} vials ASV-POLY from ${activeProposal.donorPhcName} to ${activeProposal.receiverPhcName}. E-Waybill ${eWaybill} issued.`,
      preStateDescription: `Receiver stock 48 vials (1.2 days coverage, CRITICAL)`,
      postStateDescription: `Receiver allocated +${activeProposal.quantityUnits} vials (11.7 days coverage, WATCHLIST). Donor retains 52.0 days safe buffer.`,
      constraintsSatisfied: true,
      hashSignature: '0x' + Math.random().toString(16).substr(2, 32),
      auditEvidenceSnapshot: {
        transferQty: activeProposal.quantityUnits,
        currentStock: 48 + activeProposal.quantityUnits,
        coverageDays: 11.7,
        riskScore: 34
      }
    };

    setAuditTrail(prev => [newAudit, ...prev]);

    // Resolve corresponding alert
    setAlerts(prev => prev.map(a => a.phcId === activeProposal.receiverPhcId ? { ...a, resolved: true } : a));

    addToast(
      'success',
      'Transfer Approved & E-Waybill Generated',
      `Dispatch of ${activeProposal.quantityUnits} vials authorised under E-Waybill ${eWaybill}. Transit van alerted.`
    );
  };

  // REJECT PROPOSAL
  const rejectProposal = (reason: string, notes?: string) => {
    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    setActiveProposal(prev => ({
      ...prev,
      status: 'REJECTED',
      rejectionReason: reason,
      humanReviewer: 'Dr. Anita Sharma (CMO)',
      humanReviewTimestamp: new Date().toISOString(),
      humanReviewNotes: notes || reason
    }));

    const newAudit: AuditRecord = {
      id: 'AUD-' + Math.floor(10000 + Math.random() * 90000),
      timestamp: formattedDate,
      isoTime: new Date().toISOString(),
      eventType: 'HUMAN_DECISION_REJECTED',
      phcId: activeProposal.receiverPhcId,
      phcName: activeProposal.receiverPhcName,
      resourceId: activeProposal.resourceId,
      actor: currentUserRole === 'DISTRICT_OFFICER' ? 'Dr. Anita Sharma (District CMO)' : 'Operational Controller',
      actorRole: currentUserRole,
      summary: `REJECTED TRANSFER: Proposed transfer of ${activeProposal.quantityUnits} vials declined. Stated reason: ${reason}.`,
      preStateDescription: `Pending Proposal TR-2026-0928-884 (${activeProposal.quantityUnits} vials)`,
      postStateDescription: `Proposal terminated. Re-solver pass requested with alternate donor parameters.`,
      constraintsSatisfied: true,
      hashSignature: '0x' + Math.random().toString(16).substr(2, 32),
      auditEvidenceSnapshot: {
        transferQty: 0,
        riskScore: 92
      }
    };

    setAuditTrail(prev => [newAudit, ...prev]);

    addToast(
      'warning',
      'Recommendation Rejected',
      `Action cancelled by decision-maker. Reason recorded: "${reason}".`
    );
  };

  // MODIFY PROPOSAL QUANTITY
  const modifyProposalQuantity = (newQty: number, notes?: string) => {
    setActiveProposal(prev => ({
      ...prev,
      quantityUnits: newQty,
      receiverPostCoverageDays: parseFloat(((48 + newQty) / 38).toFixed(1)),
      humanReviewNotes: notes || `Quantity adjusted by officer to ${newQty} units.`
    }));

    addToast(
      'info',
      'Proposal Parameters Adjusted',
      `Transfer quantity set to ${newQty} units. Impact metrics recalculated.`
    );
  };

  // RE-RUN SOLVER
  const reRunSolver = () => {
    addToast('info', 'Solver Optimization Executing', 'Scanning 28 edge nodes, evaluating transit corridors & cold-chain SLAs...');
    setTimeout(() => {
      setActiveProposal(prev => ({
        ...prev,
        status: 'PENDING_APPROVAL',
        solverExecutionMs: 138,
        createdAt: new Date().toISOString()
      }));
      addToast('success', 'Solver Converged in 138ms', 'Optimal mutual-aid route identified with 0 constraint violations.');
    }, 900);
  };

  // REFRESH TELEMETRY
  const refreshTelemetry = () => {
    addToast('info', 'Syncing Network Telemetry', 'Requesting differential updates from 28 PHC Edge Gateways...');
    setTimeout(() => {
      setPhcNodes(prev => prev.map(p => ({
        ...p,
        dataFreshnessMinutes: Math.floor(Math.random() * 4) + 1
      })));
      addToast('success', 'Telemetry Synchronized', 'All 28 PHC nodes reported telemetry with validated checksums.');
    }, 700);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedPhcId,
        setSelectedPhcId,
        selectedPhc,
        selectedResourceId,
        setSelectedResourceId,
        currentUserRole,
        setCurrentUserRole,
        isEmergencyMode,
        toggleEmergencyMode,
        phcNodes,
        activeProposal,
        candidateDonors: CANDIDATE_DONORS_FOR_PHC184,
        auditTrail,
        alerts,
        toasts,
        addToast,
        dismissToast,
        isHubOpen,
        toggleHub,
        closeHub,
        isPaletteOpen,
        setIsPaletteOpen,
        isModifyModalOpen,
        setIsModifyModalOpen,
        approveProposal,
        rejectProposal,
        modifyProposalQuantity,
        reRunSolver,
        refreshTelemetry,
        searchQuery,
        setSearchQuery,
        selectedDistrictFilter,
        setSelectedDistrictFilter,
        selectedRiskFilter,
        setSelectedRiskFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
