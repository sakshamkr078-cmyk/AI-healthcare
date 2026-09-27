export type RiskLevel = 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'WATCHLIST' | 'STABLE';

export type UserRole = 
  | 'DISTRICT_OFFICER' 
  | 'PHC_OPERATOR' 
  | 'EMERGENCY_CONTROLLER' 
  | 'FEDERATION_ADMIN' 
  | 'AUDITOR';

export type ScreenView = 
  | 'network-pulse' 
  | 'risk-radar' 
  | 'phc-workspace' 
  | 'resolve' 
  | 'ai-explanation' 
  | 'human-approval' 
  | 'audit' 
  | 'federation' 
  | 'emergency';

export interface ResourceItem {
  id: string;
  name: string;
  category: 'ANTIVENOM' | 'ANTIBIOTIC' | 'INSULIN' | 'IV_FLUIDS' | 'VACCINE' | 'DIAGNOSTIC';
  unit: string;
  criticalityTier: 'TIER_1_LIFESAVING' | 'TIER_2_ESSENTIAL' | 'TIER_3_SUPPORTIVE';
  coldChainRequired: boolean;
  tempRangeC?: string;
}

export interface PHCInventoryItem {
  resourceId: string;
  resourceName: string;
  currentStock: number;
  safetyThreshold: number;
  dailyBurnRate: number;
  predictedDemand14d: number;
  coverageDays: number;
  riskLevel: RiskLevel;
  batchNumber: string;
  expiryDate: string;
  storageTempC: number;
  tempStatus: 'OPTIMAL' | 'WARNING' | 'EXCURSION';
  lastCountTimestamp: string;
}

export interface PHCNode {
  id: string;
  code: string;
  name: string;
  type: 'RURAL_PHC' | 'COMMUNITY_HEALTH_CENTRE' | 'SUB_DISTRICT_HOSPITAL' | 'URBAN_PHC';
  district: string;
  subDivision: string;
  catchmentPopulation: number;
  bedsCount: number;
  latitude: number;
  longitude: number;
  mapX: number; // Normalized coordinate for schematic SVG map (0-1000)
  mapY: number; // Normalized coordinate for schematic SVG map (0-600)
  overallRisk: RiskLevel;
  operationalStatus: 'FULLY_OPERATIONAL' | 'REDUCED_CAPACITY' | 'ISOLATED_MONSOON';
  networkConnectionStatus: 'ONLINE_SYNCED' | 'EDGE_OFFLINE_BUFFERED' | 'DEGRADED';
  dataFreshnessMinutes: number;
  inventory: PHCInventoryItem[];
  medicalOfficerInCharge: string;
  contactPhone: string;
  nearestTransitHighway: string;
  dailyPatientFootfall: number;
  surgeStatus: 'NORMAL' | 'SURGE_MONSOON' | 'SURGE_OUTBREAK' | 'POST_SURGE';
}

export interface CandidateDonor {
  phcId: string;
  phcName: string;
  distanceKm: number;
  transitTimeMinutes: number;
  availableStock: number;
  surplusAboveSafety: number;
  postTransferCoverageDays: number;
  roadCondition: 'CLEAR_HIGHWAY' | 'STATE_HIGHWAY' | 'WATERLOGGED_PASSABLE' | 'BLOCKED';
  isSafe: boolean;
  disqualificationReason?: string;
  coldChainViability: 'EXCELLENT' | 'ADEQUATE' | 'AT_RISK';
}

export interface TransferProposal {
  id: string;
  createdAt: string;
  resourceId: string;
  resourceName: string;
  receiverPhcId: string;
  receiverPhcName: string;
  donorPhcId: string;
  donorPhcName: string;
  quantityUnits: number;
  unit: string;
  transitRoute: string;
  transitDurationMinutes: number;
  transitVehicleType: string;
  vehicleRegNumber: string;
  tempLoggerTag: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'IN_TRANSIT' | 'DELIVERED';
  receiverPreCoverageDays: number;
  receiverPostCoverageDays: number;
  donorPreCoverageDays: number;
  donorPostCoverageDays: number;
  solverConverged: boolean;
  solverExecutionMs: number;
  constraintsVerified: {
    name: string;
    description: string;
    satisfied: boolean;
    margin: string;
  }[];
  explanationSummary: string;
  rejectionReason?: string;
  humanReviewer?: string;
  humanReviewTimestamp?: string;
  humanReviewNotes?: string;
  eWaybillNumber?: string;
}

export interface RiskDriverAttribution {
  driver: string;
  impactPercentage: number;
  category: 'EPIDEMIOLOGICAL' | 'SUPPLY_CHAIN' | 'WEATHER' | 'BUFFER';
  evidenceMetric: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  isoTime: string;
  eventType: 
    | 'TELEMETRY_INGEST'
    | 'ANOMALY_FLAGGED'
    | 'FEDERATED_ROUND_COMPLETED'
    | 'SOLVER_ALLOCATION_GENERATED'
    | 'HUMAN_DECISION_APPROVED'
    | 'HUMAN_DECISION_REJECTED'
    | 'HUMAN_DECISION_MODIFIED'
    | 'DISPATCH_COMMENCED'
    | 'COLD_CHAIN_CHECKPOINT'
    | 'DELIVERY_CONFIRMED';
  phcId?: string;
  phcName?: string;
  resourceId?: string;
  actor: string;
  actorRole: UserRole | 'FEDERATED_AI_SOLVER' | 'EDGE_IOT_SENSOR' | 'CENTRAL_COORDINATOR';
  summary: string;
  preStateDescription: string;
  postStateDescription: string;
  constraintsSatisfied: boolean;
  hashSignature: string;
  auditEvidenceSnapshot: {
    currentStock?: number;
    predictedDemand?: number;
    coverageDays?: number;
    riskScore?: number;
    transferQty?: number;
  };
}

export interface NetworkAlert {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  phcId: string;
  phcName: string;
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  actionRoute: ScreenView;
}

export interface FederatedModelStatus {
  currentRound: number;
  targetRounds: number;
  convergenceScore: number; // 0-100
  privacyEpsilon: number; // Differential privacy parameter
  privacyDelta: string;
  edgeNodesReporting: number;
  totalEdgeNodes: number;
  lastRoundDurationSeconds: number;
  globalLoss: number;
  localAccuracyBaseline: number; // %
  federatedAccuracyCurrent: number; // %
  zeroRawDataGuarantee: boolean;
}
