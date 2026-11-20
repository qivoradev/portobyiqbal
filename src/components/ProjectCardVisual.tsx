interface ProjectCardVisualProps {
  id: string;
  lang?: 'in' | 'en';
  previewLabel?: string;
  className?: string;
}

export function PizzaSalesCardVisual({
  lang = 'in',
  previewLabel,
}: {
  lang?: 'in' | 'en';
  previewLabel?: string;
}) {
  const label = previewLabel || (lang === 'in' ? 'Pola jam sibuk' : 'Rush hour pattern');
  const sampleTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  return (
    <div className="w-full h-full bg-white/80 p-3.5 sm:p-4.5 flex flex-col justify-between select-none rounded-[20px] sm:rounded-[22px] border border-black/8 overflow-hidden">
      {/* Top Bar: Left label + Right "Sample data" tag (Zero (01) number) */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5 shrink-0">
        <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#222222] tracking-tight">
          {label}
        </span>
        <span className="px-2 py-0.5 rounded bg-black/5 text-[9.5px] sm:text-[10px] font-mono text-[#666666] uppercase tracking-wider">
          {sampleTag}
        </span>
      </div>

      {/* Main Chart Composition: Dual-Peak Area Curve Filling Full Height */}
      <div className="flex-1 min-h-0 flex flex-col justify-center py-2 w-full">
        <div className="w-full flex-1 min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 400 130" className="w-full h-full max-h-[170px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pizzaRushGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Guidelines */}
            <line x1="0" y1="28" x2="400" y2="28" stroke="#EAEAEA" strokeDasharray="3 3" />
            <line x1="0" y1="72" x2="400" y2="72" stroke="#EAEAEA" strokeDasharray="3 3" />
            <line x1="0" y1="116" x2="400" y2="116" stroke="#E0E0E0" />

            {/* Rush Hour Highlight Bands (12-13 and 17-18) */}
            <rect x="110" y="15" width="50" height="101" fill="#10B981" fillOpacity="0.10" rx="6" />
            <rect x="250" y="15" width="50" height="101" fill="#10B981" fillOpacity="0.10" rx="6" />

            {/* Filled Area */}
            <path
              d="M 0 116 C 35 116, 75 110, 110 60 C 122 34, 138 26, 155 52 C 180 92, 220 94, 252 42 C 268 20, 285 28, 302 60 C 335 102, 370 116, 400 116 L 400 116 L 0 116 Z"
              fill="url(#pizzaRushGrad3)"
            />

            {/* Curve Line */}
            <path
              d="M 0 116 C 35 116, 75 110, 110 60 C 122 34, 138 26, 155 52 C 180 92, 220 94, 252 42 C 268 20, 285 28, 302 60 C 335 102, 370 116, 400 116"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.75"
              strokeLinecap="round"
            />

            {/* Peak Nodes */}
            <circle cx="135" cy="28" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="275" cy="24" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>

        {/* X-Axis: 4 Ticks Only, Font >= 11px */}
        <div className="flex justify-between text-[11px] font-mono text-[#777777] pt-2 border-t border-black/5 shrink-0">
          <span>10:00</span>
          <span className="font-semibold text-[#10B981]">12:00–13:00</span>
          <span className="font-semibold text-[#10B981]">17:00–18:00</span>
          <span>22:00</span>
        </div>
      </div>
    </div>
  );
}

export function SuperstoreSalesCardVisual({
  lang = 'in',
  previewLabel,
}: {
  lang?: 'in' | 'en';
  previewLabel?: string;
}) {
  const label = previewLabel || (lang === 'in' ? 'Margin per wilayah' : 'Margin by region');
  const sampleTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  const regions = [
    { name: 'Region A', sales: '82%', margin: '28%' },
    { name: 'Region B', sides: 'East', sales: '88%', margin: '32%' },
    { name: 'Region C', sales: '64%', margin: '18%' },
    { name: 'Region D', sales: '56%', margin: '22%' },
  ];

  return (
    <div className="w-full h-full bg-white/80 p-3.5 sm:p-4.5 flex flex-col justify-between select-none rounded-[20px] sm:rounded-[22px] border border-black/8 overflow-hidden">
      {/* Top Bar: Left label + Right "Sample data" tag */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5 shrink-0">
        <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#222222] tracking-tight">
          {label}
        </span>
        <span className="px-2 py-0.5 rounded bg-black/5 text-[9.5px] sm:text-[10px] font-mono text-[#666666] uppercase tracking-wider">
          {sampleTag}
        </span>
      </div>

      {/* Main Composition: Sales vs Margin Filling Full Height */}
      <div className="flex-1 min-h-0 flex flex-col justify-between py-2 w-full">
        {/* Dedicated Legend Row */}
        <div className="flex items-center gap-4 text-[11px] text-[#555555] pb-2 shrink-0 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#2563EB]" />
            <span>{lang === 'in' ? 'Penjualan' : 'Sales'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#10B981]" />
            <span>Margin</span>
          </span>
        </div>

        {/* 4 Regions Horizontal Bars */}
        <div className="space-y-2.5 flex-1 flex flex-col justify-around my-1">
          {regions.map((r) => (
            <div key={r.name} className="flex items-center gap-3 text-[11.5px] font-mono">
              <span className="w-20 text-[#444444] font-medium shrink-0">{r.name}</span>
              <div className="flex-1 flex gap-1 h-5 bg-black/5 rounded p-0.5 border border-black/5">
                <div className="bg-[#2563EB] rounded-xs h-full" style={{ width: r.sales }} />
                <div className="bg-[#10B981] rounded-xs h-full" style={{ width: r.margin }} />
              </div>
            </div>
          ))}
        </div>

        {/* X-Axis / Scale: 4 Ticks Only, Font >= 11px */}
        <div className="flex justify-between text-[11px] font-mono text-[#777777] pt-2 border-t border-black/5 shrink-0">
          <span>0%</span>
          <span>33%</span>
          <span>66%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

export function NYCTrafficCardVisual({
  lang = 'in',
  previewLabel,
}: {
  lang?: 'in' | 'en';
  previewLabel?: string;
}) {
  const label = previewLabel || (lang === 'in' ? 'Insiden per jam' : 'Incidents by hour');
  const sampleTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  const hourlyDistribution = [
    18, 14, 10, 8, 12, 22, 38, 54, 48, 42, 45, 52,
    58, 50, 48, 62, 78, 86, 72, 58, 44, 36, 28, 22,
  ];

  return (
    <div className="w-full h-full bg-white/80 p-3.5 sm:p-4.5 flex flex-col justify-between select-none rounded-[20px] sm:rounded-[22px] border border-black/8 overflow-hidden">
      {/* Top Bar: Left label + Right "Sample data" tag */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5 shrink-0">
        <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#222222] tracking-tight">
          {label}
        </span>
        <span className="px-2 py-0.5 rounded bg-black/5 text-[9.5px] sm:text-[10px] font-mono text-[#666666] uppercase tracking-wider">
          {sampleTag}
        </span>
      </div>

      {/* Main Composition: 24-Hour Histogram Filling Full Height */}
      <div className="flex-1 min-h-0 flex flex-col justify-between py-2 w-full">
        {/* 24-Hour Distribution Bars */}
        <div className="flex-1 min-h-[110px] max-h-[170px] flex items-end gap-1 px-1.5 pt-2 pb-1 border-b border-black/10 bg-black/5 rounded-lg">
          {hourlyDistribution.map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
              <div
                className={`w-full rounded-t-xs transition-all ${(idx >= 7 && idx <= 8) || (idx >= 16 && idx <= 18)
                  ? 'bg-[#F59E0B]'
                  : 'bg-[#CBD5E1]'
                  }`}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        {/* X-Axis: 4 Ticks Only, Font >= 11px */}
        <div className="flex justify-between text-[11px] font-mono text-[#777777] pt-2 shrink-0">
          <span>00:00</span>
          <span>08:00</span>
          <span>16:00</span>
          <span>23:00</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectCardVisual({
  id,
  lang = 'in',
  previewLabel,
}: ProjectCardVisualProps) {
  if (id === 'pizza-sales') {
    return <PizzaSalesCardVisual lang={lang} previewLabel={previewLabel} />;
  }
  if (id === 'superstore-sales') {
    return <SuperstoreSalesCardVisual lang={lang} previewLabel={previewLabel} />;
  }
  if (id === 'nyc-traffic') {
    return <NYCTrafficCardVisual lang={lang} previewLabel={previewLabel} />;
  }
  return <PizzaSalesCardVisual lang={lang} previewLabel={previewLabel} />;
}
