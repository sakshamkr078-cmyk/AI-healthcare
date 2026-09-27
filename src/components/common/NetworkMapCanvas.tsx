import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PHCNode } from '../../types';
import { Truck, AlertTriangle, Layers, Navigation, ExternalLink } from 'lucide-react';

interface NetworkMapCanvasProps {
  height?: number;
  interactive?: boolean;
}

export const NetworkMapCanvas: React.FC<NetworkMapCanvasProps> = ({ 
  height = 420,
  interactive = true 
}) => {
  const { phcNodes, selectedPhcId, setSelectedPhcId, setCurrentView, activeProposal } = useApp();
  const [hoveredNode, setHoveredNode] = useState<PHCNode | null>(null);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);

  const receiver = phcNodes.find(p => p.id === activeProposal.receiverPhcId);
  const donor = phcNodes.find(p => p.id === activeProposal.donorPhcId);

  const getNodeColor = (node: PHCNode) => {
    switch (node.overallRisk) {
      case 'CRITICAL': return { fill: '#dc2626', stroke: '#991b1b', halo: 'rgba(220, 38, 38, 0.25)' };
      case 'HIGH': return { fill: '#ea580c', stroke: '#c2410c', halo: 'rgba(234, 88, 12, 0.2)' };
      case 'ELEVATED': return { fill: '#d97706', stroke: '#b45309', halo: 'rgba(217, 119, 6, 0.15)' };
      case 'WATCHLIST': return { fill: '#0284c7', stroke: '#0369a1', halo: 'rgba(2, 132, 199, 0.15)' };
      case 'STABLE':
      default: return { fill: '#16a34a', stroke: '#15803d', halo: 'rgba(22, 163, 74, 0.15)' };
    }
  };

  const handleNodeClick = (node: PHCNode) => {
    setSelectedPhcId(node.id);
  };

  const handleViewWorkspace = (nodeId: string) => {
    setSelectedPhcId(nodeId);
    setCurrentView('phc-workspace');
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#f4f6f4',
        border: '1px solid #d4e0da',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 4px rgba(15, 53, 46, 0.05)'
      }}
    >
      {/* Map Header Controls */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #d4e0da',
            borderRadius: '6px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'auto'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              display: 'inline-block'
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f352e' }}>
            North Arcot &amp; Chengalpattu Network Grid (28 Nodes)
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #d4e0da',
            borderRadius: '6px',
            padding: '4px',
            pointerEvents: 'auto'
          }}
        >
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '4px',
              backgroundColor: showRoutes ? '#e8f3f0' : 'transparent',
              color: showRoutes ? '#0f352e' : '#768a84'
            }}
            title="Toggle active transfer mutual-aid vectors"
          >
            <Truck size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Transfer Routes
          </button>
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '4px',
              backgroundColor: showCorridors ? '#e8f3f0' : 'transparent',
              color: showCorridors ? '#0f352e' : '#768a84'
            }}
            title="Toggle arterial highways (NH-32, NH-48)"
          >
            <Layers size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Highways
          </button>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <svg
        viewBox="0 0 920 580"
        style={{
          width: '100%',
          height: `${height}px`,
          display: 'block',
          cursor: interactive ? 'grab' : 'default'
        }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(21, 77, 67, 0.05)" strokeWidth="1" />
          </pattern>
          {/* Radial glow for critical nodes */}
          <radialGradient id="criticalHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#dc2626" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
          {/* Radial glow for safe donor */}
          <radialGradient id="safeHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#16a34a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </radialGradient>
          {/* Marker arrow for transfer */}
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#194d43" />
          </marker>
        </defs>

        {/* Background Grid */}
        <rect width="920" height="580" fill="url(#gridPattern)" />

        {/* Schematic District Boundaries */}
        <path
          d="M 60,180 Q 240,110 480,90 T 880,70 L 890,480 Q 650,560 380,540 T 40,490 Z"
          fill="rgba(240, 244, 241, 0.6)"
          stroke="#d1ded8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Coastal Edge (Bay of Bengal schematic line) */}
        <path
          d="M 820,40 Q 860,260 840,400 T 890,560"
          fill="none"
          stroke="#bce5ec"
          strokeWidth="6"
          opacity="0.6"
        />
        <text x="850" y="520" fill="#088fa6" fontSize="10" fontWeight="700" letterSpacing="0.1em" transform="rotate(85 850 520)">
          COASTAL SECTOR (BAY OF BENGAL)
        </text>

        {/* Major Transit Highways */}
        {showCorridors && (
          <g opacity="0.65">
            {/* NH-32 (Chennai-Chengalpattu-Madurantakam-Tindivanam Corridor) */}
            <path
              d="M 720,100 L 580,260 L 430,380 L 300,530"
              fill="none"
              stroke="#84a98c"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="500" y="325" fill="#2d453f" fontSize="9" fontWeight="700" transform="rotate(38 500 325)">
              NH-32 (4-LANE MEDICAL CORRIDOR)
            </text>

            {/* NH-48 (Bengaluru-Kanchipuram-Chennai Link) */}
            <path
              d="M 120,110 L 320,190 L 520,120 L 710,130"
              fill="none"
              stroke="#98b6a0"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            <text x="360" y="160" fill="#2d453f" fontSize="9" fontWeight="600" transform="rotate(-18 360 160)">
              NH-48 EXPRESSWAY
            </text>
          </g>
        )}

        {/* Active Transfer Proposal Vector: PHC 192 (Donor) -> PHC 184 (Receiver) */}
        {showRoutes && receiver && donor && (
          <g>
            <path
              d={`M ${donor.mapX} ${donor.mapY} Q ${(donor.mapX + receiver.mapX) / 2 + 30} ${(donor.mapY + receiver.mapY) / 2 - 15} ${receiver.mapX} ${receiver.mapY}`}
              fill="none"
              stroke="#0f352e"
              strokeWidth="3"
              strokeDasharray="8 5"
              markerEnd="url(#arrow)"
            >
              <animate attributeName="stroke-dashoffset" from="26" to="0" dur="1.2s" repeatCount="indefinite" />
            </path>
            {/* Route Distance / Status Pill */}
            <rect
              x={(donor.mapX + receiver.mapX) / 2 - 40}
              y={(donor.mapY + receiver.mapY) / 2 - 28}
              width="105"
              height="22"
              rx="4"
              fill="#0f352e"
            />
            <text
              x={(donor.mapX + receiver.mapX) / 2 + 12}
              y={(donor.mapY + receiver.mapY) / 2 - 13}
              fill="#ffffff"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
            >
              400 Vials • 42 mins
            </text>
          </g>
        )}

        {/* PHC Nodes */}
        {phcNodes.map(node => {
          const isSelected = node.id === selectedPhcId;
          const isHovered = hoveredNode?.id === node.id;
          const isReceiver = node.id === activeProposal.receiverPhcId;
          const isDonor = node.id === activeProposal.donorPhcId;
          const colors = getNodeColor(node);
          const radius = node.type === 'SUB_DISTRICT_HOSPITAL' ? 10 : node.type === 'COMMUNITY_HEALTH_CENTRE' ? 8 : 6.5;

          return (
            <g
              key={node.id}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Critical pulsating halo */}
              {node.overallRisk === 'CRITICAL' && (
                <circle
                  cx={node.mapX}
                  cy={node.mapY}
                  r="30"
                  fill="url(#criticalHalo)"
                  className="animate-pulse-slow"
                />
              )}

              {/* Safe donor halo */}
              {isDonor && (
                <circle
                  cx={node.mapX}
                  cy={node.mapY}
                  r="24"
                  fill="url(#safeHalo)"
                />
              )}

              {/* Selection Ring */}
              {isSelected && (
                <circle
                  cx={node.mapX}
                  cy={node.mapY}
                  r={radius + 6}
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2.5"
                />
              )}

              {/* Node Outer Circle */}
              <circle
                cx={node.mapX}
                cy={node.mapY}
                r={radius}
                fill={colors.fill}
                stroke="#ffffff"
                strokeWidth={isSelected ? '3' : '2'}
              />

              {/* Center Dot for Hospitals */}
              {node.type === 'SUB_DISTRICT_HOSPITAL' && (
                <circle
                  cx={node.mapX}
                  cy={node.mapY}
                  r="2.5"
                  fill="#ffffff"
                />
              )}

              {/* Node Label for prominent nodes */}
              {(node.overallRisk === 'CRITICAL' || isDonor || isSelected || isHovered || radius >= 8) && (
                <g>
                  <rect
                    x={node.mapX - 40}
                    y={node.mapY + radius + 4}
                    width="80"
                    height="18"
                    rx="3"
                    fill={isSelected ? '#0f352e' : 'rgba(255, 255, 255, 0.95)'}
                    stroke={isSelected ? '#0f352e' : '#d4e0da'}
                    strokeWidth="1"
                  />
                  <text
                    x={node.mapX}
                    y={node.mapY + radius + 16}
                    fill={isSelected ? '#ffffff' : '#0f352e'}
                    fontSize="9.5"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {node.name.split('—')[0].trim()}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating Node Information Card (Hovered or Selected) */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '14px',
            backgroundColor: '#ffffff',
            border: '1px solid #b2c5bd',
            borderRadius: '8px',
            padding: '12px 14px',
            boxShadow: '0 8px 20px rgba(15, 53, 46, 0.12)',
            zIndex: 20,
            maxWidth: '320px',
            pointerEvents: 'auto'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f352e' }}>
              {hoveredNode.name}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: hoveredNode.overallRisk === 'CRITICAL' ? '#fee2e2' : '#f0fdf4',
                color: hoveredNode.overallRisk === 'CRITICAL' ? '#991b1b' : '#166534'
              }}
            >
              {hoveredNode.overallRisk}
            </span>
          </div>

          <div style={{ fontSize: '11px', color: '#475a55', marginBottom: '8px', lineHeight: '1.4' }}>
            <div><strong>Catchment:</strong> {hoveredNode.catchmentPopulation.toLocaleString()} people ({hoveredNode.bedsCount} beds)</div>
            <div><strong>Daily Footfall:</strong> {hoveredNode.dailyPatientFootfall} admissions/day</div>
            <div><strong>Access Route:</strong> {hoveredNode.nearestTransitHighway}</div>
          </div>

          {hoveredNode.inventory.length > 0 && (
            <div style={{ borderTop: '1px solid #e5ece8', paddingTop: '6px', marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#768a84', textTransform: 'uppercase', marginBottom: '4px' }}>
                Key Resource Status
              </div>
              {hoveredNode.inventory.slice(0, 2).map(inv => (
                <div key={inv.resourceId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', margin: '2px 0' }}>
                  <span>{inv.resourceName}:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: inv.riskLevel === 'CRITICAL' ? '#dc2626' : '#166534' }}>
                    {inv.currentStock} ({inv.coverageDays}d coverage)
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => handleViewWorkspace(hoveredNode.id)}
              style={{
                flex: 1,
                fontSize: '11px',
                fontWeight: 600,
                padding: '5px 8px',
                backgroundColor: '#194d43',
                color: '#ffffff',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              Open PHC Workspace
              <ExternalLink size={11} />
            </button>
          </div>
        </div>
      )}

      {/* Legend Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          border: '1px solid #d4e0da',
          borderRadius: '6px',
          padding: '4px 10px',
          display: 'flex',
          gap: '12px',
          fontSize: '11px',
          color: '#475a55',
          fontWeight: 600
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} /> Critical
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ea580c' }} /> High Risk
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706' }} /> Elevated
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} /> Stable / Donor
        </span>
      </div>
    </div>
  );
};
