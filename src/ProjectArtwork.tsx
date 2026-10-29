import { useId } from "react";
import { Check, ClipboardList, Layers3, MapPinned } from "lucide-react";
import type { PortfolioProject } from "./content";

function MapArtwork() {
  const gridId = useId();

  return (
    <div className="artwork-window">
      <div className="artwork-topbar">
        <span><MapPinned size={12} /> Spatial overview</span>
        <span className="artwork-window-dots"><i /><i /><i /></span>
      </div>
      <div className="map-scene">
        <svg className="map-drawing" viewBox="0 0 440 205" fill="none">
          <defs>
            <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" stroke="currentColor" strokeOpacity="0.07" />
            </pattern>
          </defs>
          <path fill={`url(#${gridId})`} d="M0 0h440v205H0z" />
          <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" strokeLinejoin="round">
            <path d="m43 50 61-29 62 13 22 49-48 40-72-18Z" fill="currentColor" fillOpacity="0.07" />
            <path d="m166 34 63-15 51 45-18 55-74-36Z" fill="currentColor" fillOpacity="0.13" />
            <path d="m68 105 72 18 18 61-66 12-48-42Z" fill="currentColor" fillOpacity="0.1" />
            <path d="m140 123 48-40 74 36-32 66-72-1Z" fill="currentColor" fillOpacity="0.23" />
            <path d="m280 64 52-28 53 25 14 66-53 25-84-33Z" fill="currentColor" fillOpacity="0.06" />
            <path d="m262 119 84 33-35 39-81-6Z" fill="currentColor" fillOpacity="0.09" />
          </g>
          <path d="M6 177c47-4 47-58 93-52s38-59 91-61 53-47 101-42 61 42 112 16" stroke="currentColor" strokeOpacity="0.2" strokeWidth="8" />
          <path d="M6 177c47-4 47-58 93-52s38-59 91-61 53-47 101-42 61 42 112 16" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.2" />
          <path d="m73 61 61 18 62 67 62-60 91 13" stroke="currentColor" strokeOpacity="0.55" strokeDasharray="3 5" />
          <g fill="currentColor">
            <circle cx="134" cy="79" r="3.5" />
            <circle cx="258" cy="86" r="3.5" />
            <circle cx="349" cy="99" r="3.5" />
          </g>
          <circle cx="196" cy="146" r="18" fill="currentColor" fillOpacity="0.08" />
          <circle cx="196" cy="146" r="10" stroke="currentColor" strokeOpacity="0.4" />
          <circle cx="196" cy="146" r="4" fill="currentColor" />
        </svg>
        <div className="map-layers">
          <span><Layers3 size={11} /> Map layers</span>
          <span><i /> Boundaries</span>
          <span><i /> Facilities</span>
          <span><i /> Hazard zones</span>
        </div>
        <span className="map-north">N<span>↑</span></span>
      </div>
    </div>
  );
}

function AuditArtwork() {
  return (
    <div className="artwork-window">
      <div className="artwork-topbar">
        <span><ClipboardList size={12} /> Audit workspace</span>
        <span className="artwork-window-dots"><i /><i /><i /></span>
      </div>
      <div className="audit-scene">
        <div className="audit-sidebar">
          <span className="audit-sidebar-mark"><ClipboardList size={15} /></span>
          <i /><i /><i /><i />
        </div>
        <div className="audit-workspace">
          <div className="audit-summary">
            <span><i /> Projects</span>
            <span><i /> Findings</span>
            <span><i /> Follow-ups</span>
          </div>
          <div className="audit-chart">
            <div className="audit-chart-heading"><span>Audit overview</span><i /></div>
            <svg viewBox="0 0 280 68" fill="none">
              <path d="M0 18h280M0 39h280M0 60h280" stroke="currentColor" strokeOpacity="0.08" />
              <g fill="currentColor">
                <path d="M13 46h14v14H13zM45 34h14v26H45zM77 40h14v20H77zM109 25h14v35h-14zM141 31h14v29h-14zM173 16h14v44h-14zM205 23h14v37h-14zM237 7h14v53h-14z" fillOpacity="0.25" />
                <path d="M29 51h7v9h-7zM61 46h7v14h-7zM93 44h7v16h-7zM125 39h7v21h-7zM157 42h7v18h-7zM189 33h7v27h-7zM221 37h7v23h-7zM253 26h7v34h-7z" fillOpacity="0.7" />
              </g>
            </svg>
          </div>
          <div className="audit-task"><span><Check size={9} /></span><i /><em /></div>
          <div className="audit-task"><span /><i /><em /></div>
        </div>
      </div>
    </div>
  );
}

export function ProjectArtwork({ kind }: { kind: PortfolioProject["artwork"] }) {
  return (
    <figure className={`project-visual project-visual--${kind}`}>
      <div className="project-artwork" aria-hidden="true">
        {kind === "map" ? <MapArtwork /> : <AuditArtwork />}
      </div>
      <figcaption>
        <span><i /> {kind === "map" ? "Maps & information" : "Projects & insights"}</span>
        <span>Concept illustration</span>
      </figcaption>
    </figure>
  );
}
