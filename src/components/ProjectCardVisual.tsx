interface ProjectCardVisualProps {
  id: string;
  lang?: 'in' | 'en';
}

export function PizzaSalesCardVisual({ lang = 'in' }: { lang?: 'in' | 'en' }) {
  const tag = lang === 'in' ? 'Pratinjau Ilustratif' : 'Illustrative preview';

  return (
    <div className="w-full h-full bg-[#FCFCFD] p-4 sm:p-5 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-xs" />
          <span className="text-[12px] font-bold text-[#111111] tracking-tight">
            Pizza Sales Performance & Operational BI
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[10px] font-medium text-[#666666] uppercase tracking-wider">
          {tag}
        </span>
      </div>

      {/* Row of 3 KPI Chips (Balanced, from CV) */}
      <div className="grid grid-cols-3 gap-2 my-2.5">
        <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
          <span className="text-[9.5px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Pendapatan' : 'Revenue'}
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-[#111111] tabular-nums tracking-tight">
            $817K+
          </span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
          <span className="text-[9.5px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Transaksi' : 'Transactions'}
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-[#10B981] tabular-nums tracking-tight">
            21,350+
          </span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
          <span className="text-[9.5px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Jam Sibuk' : 'Rush Hours'}
          </span>
          <span className="text-[14px] sm:text-[15px] font-bold text-[#111111] tabular-nums tracking-tight">
            12–13 · 17–18
          </span>
        </div>
      </div>

      {/* Charts Container: Dual-Peak Curve (Left) + Donut Categories (Right) */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1 items-stretch min-h-[130px]">
        {/* Left: Dual Peak Rush Hour Curve (Span 7) */}
        <div className="sm:col-span-7 bg-white rounded-xl p-2.5 border border-black/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-[#666666] font-medium mb-1">
            <span>{lang === 'in' ? 'Pola Volume Jam Sibuk (Staggered Shift)' : 'Rush Hour Pattern (Staggered Shift)'}</span>
            <span className="text-[#10B981] font-semibold">Peak: 2.5K/hr</span>
          </div>

          {/* SVG Smooth Dual Peak Area Chart */}
          <div className="relative w-full h-18 sm:h-20">
            <svg viewBox="0 0 240 70" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pizzaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="18" x2="240" y2="18" stroke="#F0F0F0" strokeDasharray="3 3" />
              <line x1="0" y1="42" x2="240" y2="42" stroke="#F0F0F0" strokeDasharray="3 3" />
              <line x1="0" y1="65" x2="240" y2="65" stroke="#E5E5E5" />

              {/* Area */}
              <path
                d="M 0 65 Q 25 65 40 55 T 80 18 T 120 48 T 170 12 T 210 52 T 240 65 L 240 65 L 0 65 Z"
                fill="url(#pizzaGrad)"
              />
              {/* Stroke */}
              <path
                d="M 0 65 Q 25 65 40 55 T 80 18 T 120 48 T 170 12 T 210 52 T 240 65"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Peak 1 Node (12:00) */}
              <circle cx="80" cy="18" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Peak 2 Node (17:00) */}
              <circle cx="170" cy="12" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex justify-between text-[9px] font-mono text-[#888888] pt-1">
            <span>10:00</span>
            <span className="font-semibold text-[#10B981]">12:00</span>
            <span>15:00</span>
            <span className="font-semibold text-[#10B981]">17:00</span>
            <span>22:00</span>
          </div>
        </div>

        {/* Right: Menu Category Donut Distribution (Span 5) */}
        <div className="sm:col-span-5 bg-white rounded-xl p-2.5 border border-black/5 flex flex-col justify-between">
          <span className="text-[10px] text-[#666666] font-medium block">
            {lang === 'in' ? 'Kategori Menu (Top 5 SKU)' : 'Menu Categories (Top 5 SKU)'}
          </span>

          <div className="flex items-center gap-2 py-1">
            {/* SVG Donut */}
            <div className="relative w-14 h-14 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Classic 30% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="5" strokeDasharray="26.4 73.6" strokeDashoffset="0" />
                {/* Supreme 26% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#2563EB" strokeWidth="5" strokeDasharray="22.8 77.2" strokeDashoffset="-26.4" />
                {/* Chicken 24% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="5" strokeDasharray="21.1 78.9" strokeDashoffset="-49.2" />
                {/* Veggie 20% */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#8B5CF6" strokeWidth="5" strokeDasharray="17.7 82.3" strokeDashoffset="-70.3" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-black">
                4 Cat.
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-1 gap-1 text-[9.5px] leading-tight text-[#444444]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Classic (30%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" /> Supreme (26%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> Chicken (24%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> Veggie (20%)
              </span>
            </div>
          </div>

          <span className="text-[9px] text-[#777777] block text-right pt-0.5">
            Excel · Looker Studio
          </span>
        </div>
      </div>
    </div>
  );
}

export function SuperstoreSalesCardVisual({ lang = 'in' }: { lang?: 'in' | 'en' }) {
  const tag = lang === 'in' ? 'Pratinjau Ilustratif' : 'Illustrative preview';

  return (
    <div className="w-full h-full bg-[#FCFCFD] p-4 sm:p-5 flex flex-col justify-between select-none">
      {/* Top Bar with Slicer Pills */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-xs" />
          <span className="text-[12px] font-bold text-[#111111] tracking-tight">
            Commercial Profitability & Margin Analysis
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[10px] font-medium text-[#666666] uppercase tracking-wider">
          {tag}
        </span>
      </div>

      {/* Slicers Row */}
      <div className="flex flex-wrap items-center gap-1.5 my-2">
        <span className="px-2.5 py-1 rounded-lg bg-white border border-black/10 text-[10.5px] font-medium text-[#111111] shadow-2xs">
          Region: All (4) ▼
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-white border border-black/10 text-[10.5px] font-medium text-[#111111] shadow-2xs">
          Discount Band: 0–30% ▼
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/25 text-[10.5px] font-semibold text-[#1D4ED8]">
          PAR Framework
        </span>
      </div>

      {/* KPI Indicators without fake claim numbers */}
      <div className="grid grid-cols-2 gap-2 my-1">
        <div className="p-2 rounded-xl bg-white border border-black/5">
          <span className="text-[9px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Fokus Analisis' : 'Analysis Focus'}
          </span>
          <span className="text-[13px] font-bold text-[#EF4444] tracking-tight">
            {lang === 'in' ? 'Penurunan Margin Laba vs Diskon' : 'Profit Margin vs Discount Drag'}
          </span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-black/5">
          <span className="text-[9px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Cakupan Geografis' : 'Geographic Scope'}
          </span>
          <span className="text-[13px] font-bold text-[#111111] tracking-tight">
            {lang === 'in' ? '4 Wilayah Penjualan Ritel' : '4 Retail Sales Territories'}
          </span>
        </div>
      </div>

      {/* Regional Sales vs Profit Comparison (Completely Finished, All 4 Regions) */}
      <div className="bg-white rounded-xl p-2.5 border border-black/5 flex flex-col justify-between mt-1">
        <div className="flex items-center justify-between text-[10px] text-[#666666] font-medium mb-1.5">
          <span>{lang === 'in' ? 'Perbandingan Margin per Wilayah' : 'Margin Comparison by Region'}</span>
          <div className="flex items-center gap-2 text-[9px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-[#2563EB]" /> Sales</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Profit</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-0.5">
          {/* East */}
          <div className="flex items-center gap-2 text-[10px] text-[#333333]">
            <span className="w-12 font-medium">East</span>
            <div className="flex-1 flex gap-1 h-3.5">
              <div className="bg-[#2563EB] rounded-xs" style={{ width: '85%' }} />
              <div className="bg-[#10B981] rounded-xs" style={{ width: '28%' }} />
            </div>
            <span className="text-[9px] font-mono text-[#666666] w-9 text-right">+22%</span>
          </div>

          {/* West */}
          <div className="flex items-center gap-2 text-[10px] text-[#333333]">
            <span className="w-12 font-medium">West</span>
            <div className="flex-1 flex gap-1 h-3.5">
              <div className="bg-[#2563EB] rounded-xs" style={{ width: '92%' }} />
              <div className="bg-[#10B981] rounded-xs" style={{ width: '32%' }} />
            </div>
            <span className="text-[9px] font-mono text-[#666666] w-9 text-right">+25%</span>
          </div>

          {/* Central */}
          <div className="flex items-center gap-2 text-[10px] text-[#333333]">
            <span className="w-12 font-medium">Central</span>
            <div className="flex-1 flex gap-1 h-3.5">
              <div className="bg-[#2563EB] rounded-xs" style={{ width: '68%' }} />
              <div className="bg-[#EF4444] rounded-xs" style={{ width: '12%' }} />
            </div>
            <span className="text-[9px] font-mono text-[#EF4444] w-9 text-right">-4.2%</span>
          </div>

          {/* South */}
          <div className="flex items-center gap-2 text-[10px] text-[#333333]">
            <span className="w-12 font-medium">South</span>
            <div className="flex-1 flex gap-1 h-3.5">
              <div className="bg-[#2563EB] rounded-xs" style={{ width: '60%' }} />
              <div className="bg-[#10B981] rounded-xs" style={{ width: '19%' }} />
            </div>
            <span className="text-[9px] font-mono text-[#666666] w-9 text-right">+14%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NYCTrafficCardVisual({ lang = 'in' }: { lang?: 'in' | 'en' }) {
  const tag = lang === 'in' ? 'Pratinjau Ilustratif' : 'Illustrative preview';

  return (
    <div className="w-full h-full bg-[#FCFCFD] p-4 sm:p-5 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-xs" />
          <span className="text-[12px] font-bold text-[#111111] tracking-tight">
            NYC Traffic Safety Incident Analytics
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-black/5 text-[10px] font-medium text-[#666666] uppercase tracking-wider">
          {tag}
        </span>
      </div>

      {/* KPI Row (Only 238,000+ from CV) */}
      <div className="grid grid-cols-2 gap-2 my-2">
        <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
          <span className="text-[9px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Catatan Divalidasi' : 'Validated Records'}
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-[#111111] tabular-nums tracking-tight">
            238,000+
          </span>
        </div>
        <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
          <span className="text-[9px] font-semibold text-[#777777] uppercase tracking-wider block">
            {lang === 'in' ? 'Fokus Investigasi' : 'Investigation Focus'}
          </span>
          <span className="text-[13px] font-bold text-[#F59E0B] tracking-tight">
            Root Cause Analysis
          </span>
        </div>
      </div>

      {/* 24-Hour Incident Distribution Bars + Heat Strip */}
      <div className="bg-white rounded-xl p-2.5 border border-black/5 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between text-[10px] text-[#666666] font-medium">
          <span>{lang === 'in' ? 'Distribusi Insiden per Jam (24 Jam)' : 'Incident Density by Hour (24h)'}</span>
          <span className="text-[#EF4444] font-semibold">{lang === 'in' ? 'Puncak: 16:00–18:00' : 'Peak: 16:00–18:00'}</span>
        </div>

        {/* 12-slot density bar chart */}
        <div className="h-14 flex items-end gap-1.5 px-1 pt-1 border-b border-black/5">
          {[20, 15, 12, 10, 25, 45, 65, 55, 75, 95, 85, 40].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
              <div
                className={`w-full rounded-t-xs transition-all ${
                  idx === 9 || idx === 10
                    ? 'bg-[#EF4444]'
                    : idx >= 6
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#E5E5E5]'
                }`}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        {/* Heat Strip: Day of Week x Peak Hours */}
        <div className="space-y-1 pt-0.5">
          <span className="text-[9px] text-[#777777] block">
            {lang === 'in' ? 'Intensitas Hari Kerja vs Akhir Pekan' : 'Weekday vs Weekend Intensity Heatmap'}
          </span>
          <div className="grid grid-cols-7 gap-1 h-3">
            <div className="bg-[#EF4444]/75 rounded-xs" title="Mon" />
            <div className="bg-[#EF4444]/85 rounded-xs" title="Tue" />
            <div className="bg-[#EF4444]/90 rounded-xs" title="Wed" />
            <div className="bg-[#EF4444] rounded-xs" title="Thu" />
            <div className="bg-[#EF4444] rounded-xs" title="Fri" />
            <div className="bg-[#F59E0B]/50 rounded-xs" title="Sat" />
            <div className="bg-[#F59E0B]/40 rounded-xs" title="Sun" />
          </div>
          <div className="flex justify-between text-[8px] font-mono text-[#888888]">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </div>
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
