interface ProjectCardVisualProps {
  id: string;
  lang?: 'in' | 'en';
}

export function PizzaSalesCardVisual({ lang = 'in' }: { lang?: 'in' | 'en' }) {
  const sampleTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  return (
    <div className="w-full h-full bg-[#FAFAFA] p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10B981] shadow-xs" />
          <span className="text-[12.5px] font-bold text-[#111111] tracking-tight">
            Pizza Sales Performance & Operational BI
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[9.5px] font-semibold text-[#666666] uppercase tracking-wider">
          {sampleTag}
        </span>
      </div>

      {/* Main Single Composition: Smooth Rush Hour Area Curve */}
      <div className="my-auto py-2 flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between text-[11px] text-[#666666] font-medium mb-2">
          <span>{lang === 'in' ? 'Pola Volume Jam Sibuk' : 'Rush Hour Volume Distribution'}</span>
          <span className="text-[#10B981] font-semibold">12–13 · 17–18</span>
        </div>

        {/* SVG Rush Hour Dual-Peak Curve */}
        <div className="relative w-full h-28 sm:h-32">
          <svg viewBox="0 0 400 110" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pizzaRushGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Guidelines */}
            <line x1="0" y1="25" x2="400" y2="25" stroke="#EFEFEF" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="400" y2="60" stroke="#EFEFEF" strokeDasharray="3 3" />
            <line x1="0" y1="95" x2="400" y2="95" stroke="#E5E5E5" />

            {/* Rush Hour Highlight Bands */}
            <rect x="110" y="15" width="45" height="80" fill="#10B981" fillOpacity="0.06" rx="4" />
            <rect x="255" y="15" width="45" height="80" fill="#10B981" fillOpacity="0.06" rx="4" />

            {/* Filled Area */}
            <path
              d="M 0 95 C 40 95, 80 88, 110 50 C 125 28, 140 22, 155 45 C 175 75, 220 80, 255 35 C 270 18, 285 24, 300 52 C 330 85, 370 95, 400 95 L 400 95 L 0 95 Z"
              fill="url(#pizzaRushGrad)"
            />

            {/* Curve Line */}
            <path
              d="M 0 95 C 40 95, 80 88, 110 50 C 125 28, 140 22, 155 45 C 175 75, 220 80, 255 35 C 270 18, 285 24, 300 52 C 330 85, 370 95, 400 95"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Peak Nodes */}
            <circle cx="132" cy="24" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="278" cy="20" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
        </div>

        {/* X-Axis Timeline */}
        <div className="flex justify-between text-[10px] font-mono text-[#777777] pt-2 border-t border-black/5">
          <span>10:00</span>
          <span className="font-semibold text-[#10B981]">12:00–13:00</span>
          <span>15:00</span>
          <span className="font-semibold text-[#10B981]">17:00–18:00</span>
          <span>22:00</span>
        </div>
      </div>

      {/* Bottom Category Strip (Top 5 SKU + 4 Categories, No Percentages) */}
      <div className="pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-bold text-black uppercase tracking-wider">
            Top 5 SKU
          </span>
          <span className="text-[#666666]">
            {lang === 'in' ? 'Kategori Menu:' : 'Menu Categories:'}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[#444444] font-medium">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Classic
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> Supreme
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> Chicken
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> Veggie
          </span>
        </div>
      </div>
    </div>
  );
}

export function SuperstoreSalesCardVisual({ lang = 'in' }: { lang?: 'in' | 'en' }) {
  const sampleTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  return (
    <div className="w-full h-full bg-[#FAFAFA] p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#2563EB] shadow-xs" />
          <span className="text-[12.5px] font-bold text-[#111111] tracking-tight">
            Commercial Profitability & Margin Analysis
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[9.5px] font-semibold text-[#666666] uppercase tracking-wider">
          {sampleTag}
        </span>
      </div>

      {/* Main Single Composition: Regional Sales vs Profit Proportional Bars */}
      <div className="my-auto py-2 flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between text-[11px] text-[#666666] font-medium mb-3">
          <span>{lang === 'in' ? 'Perbandingan Penjualan & Margin Regional' : 'Regional Sales & Margin Breakdown'}</span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-[#2563EB]" />
              <span>{lang === 'in' ? 'Penjualan' : 'Sales'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-[#10B981]" />
              <span>{lang === 'in' ? 'Laba' : 'Profit'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-[#EF4444]" />
              <span>{lang === 'in' ? 'Diskon Defisit' : 'Deficit'}</span>
            </span>
          </div>
        </div>

        {/* 4 Regions Proportional Bars */}
        <div className="space-y-3">
          {/* East */}
          <div className="flex items-center gap-3 text-[11.5px]">
            <span className="w-14 font-medium text-[#222222]">East</span>
            <div className="flex-1 flex gap-1.5 h-4 bg-white rounded-md p-0.5 border border-black/5">
              <div className="bg-[#2563EB] rounded-xs h-full" style={{ width: '82%' }} />
              <div className="bg-[#10B981] rounded-xs h-full" style={{ width: '28%' }} />
            </div>
          </div>

          {/* West */}
          <div className="flex items-center gap-3 text-[11.5px]">
            <span className="w-14 font-medium text-[#222222]">West</span>
            <div className="flex-1 flex gap-1.5 h-4 bg-white rounded-md p-0.5 border border-black/5">
              <div className="bg-[#2563EB] rounded-xs h-full" style={{ width: '88%' }} />
              <div className="bg-[#10B981] rounded-xs h-full" style={{ width: '32%' }} />
            </div>
          </div>

          {/* Central */}
          <div className="flex items-center gap-3 text-[11.5px]">
            <span className="w-14 font-medium text-[#222222]">Central</span>
            <div className="flex-1 flex gap-1.5 h-4 bg-white rounded-md p-0.5 border border-black/5">
              <div className="bg-[#2563EB] rounded-xs h-full" style={{ width: '64%' }} />
              <div className="bg-[#EF4444] rounded-xs h-full" style={{ width: '16%' }} />
            </div>
          </div>

          {/* South */}
          <div className="flex items-center gap-3 text-[11.5px]">
            <span className="w-14 font-medium text-[#222222]">South</span>
            <div className="flex-1 flex gap-1.5 h-4 bg-white rounded-md p-0.5 border border-black/5">
              <div className="bg-[#2563EB] rounded-xs h-full" style={{ width: '56%' }} />
              <div className="bg-[#10B981] rounded-xs h-full" style={{ width: '18%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Row */}
      <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-[#666666]">
        <span>Microsoft Excel · PivotTable & Calculated Fields</span>
        <span className="font-semibold text-[#111111]">PAR Framework</span>
      </div>
    </div>
  );
}

export function NYCTrafficCardVisual({ lang = 'in' }: { lang?: 'in' | 'en' }) {
  const sampleTag = lang === 'in' ? 'Data contoh' : 'Sample data';

  return (
    <div className="w-full h-full bg-[#FAFAFA] p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B] shadow-xs" />
          <span className="text-[12.5px] font-bold text-[#111111] tracking-tight">
            NYC Traffic Safety Incident Analytics
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[9.5px] font-semibold text-[#666666] uppercase tracking-wider">
          {sampleTag}
        </span>
      </div>

      {/* Main Single Composition: 24-Hour Hourly Density Bars */}
      <div className="my-auto py-2 flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between text-[11px] text-[#666666] font-medium mb-2">
          <span>{lang === 'in' ? 'Distribusi Kepadatan Insiden (Siklus 24 Jam)' : 'Incident Density Distribution (24-Hour Cycle)'}</span>
          <span>{lang === 'in' ? 'Pola Komutasi Harian' : 'Daily Commute Patterns'}</span>
        </div>

        {/* 24-Hour Distribution Bars */}
        <div className="h-24 sm:h-28 flex items-end gap-1 px-1 pt-1 pb-1 border-b border-black/10 bg-white rounded-lg">
          {[
            18, 14, 10, 8, 12, 22, 38, 54, 48, 42, 45, 52,
            58, 50, 48, 62, 78, 86, 72, 58, 44, 36, 28, 22
          ].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
              <div
                className={`w-full rounded-t-xs transition-all ${
                  idx >= 16 && idx <= 18
                    ? 'bg-[#EF4444]'
                    : idx >= 7 && idx <= 8
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#CBD5E1]'
                }`}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        {/* Timeline Axis */}
        <div className="flex justify-between text-[10px] font-mono text-[#777777] pt-1.5">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:00</span>
        </div>
      </div>

      {/* Bottom Status Row */}
      <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-[#666666]">
        <span>Microsoft Excel · XLOOKUP & Pivot Charts</span>
        <span className="font-semibold text-[#111111]">Root Cause Analysis</span>
      </div>
    </div>
  );
}

export function ProjectCardVisual({ id, lang = 'in' }: ProjectCardVisualProps) {
  if (id === 'pizza-sales') return <PizzaSalesCardVisual lang={lang} />;
  if (id === 'superstore-sales') return <SuperstoreSalesCardVisual lang={lang} />;
  if (id === 'nyc-traffic') return <NYCTrafficCardVisual lang={lang} />;
  return <PizzaSalesCardVisual lang={lang} />;
}
