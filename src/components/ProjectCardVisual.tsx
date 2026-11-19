export function PizzaSalesCardVisual() {
  return (
    <div className="w-full h-full bg-white p-5 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-wide uppercase text-black">
            Pizza Sales Performance
          </span>
        </div>
        <span className="text-[10px] font-medium text-[#737373]">
          21,350+ Trans. · $817K+
        </span>
      </div>

      {/* KPI & Mini Chart */}
      <div className="py-2 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          <div className="p-1.5 rounded-lg bg-[#F8F9FA] border border-black/5">
            <span className="text-[8.5px] text-[#666666] uppercase block font-medium">Revenue</span>
            <span className="text-[13px] font-semibold text-black tracking-tight">$817,860</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[#F8F9FA] border border-black/5">
            <span className="text-[8.5px] text-[#666666] uppercase block font-medium">Rush Hours</span>
            <span className="text-[13px] font-semibold text-[#10B981] tracking-tight">12 & 17</span>
          </div>
          <div className="p-1.5 rounded-lg bg-[#F8F9FA] border border-black/5">
            <span className="text-[8.5px] text-[#666666] uppercase block font-medium">Top SKUs</span>
            <span className="text-[13px] font-semibold text-black tracking-tight">Classic/Veg</span>
          </div>
        </div>

        {/* Minimal Category Volume Bars */}
        <div className="h-18 flex items-end gap-2 pt-1 border-b border-[#F0F0F0]">
          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#10B981] rounded-t-xs" style={{ height: '90%' }} />
            <span className="text-[8.5px] text-[#737373]">Classic</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#E5E5E5] rounded-t-xs" style={{ height: '78%' }} />
            <span className="text-[8.5px] text-[#737373]">Supreme</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#E5E5E5] rounded-t-xs" style={{ height: '65%' }} />
            <span className="text-[8.5px] text-[#737373]">Chicken</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#E5E5E5] rounded-t-xs" style={{ height: '60%' }} />
            <span className="text-[8.5px] text-[#737373]">Veggie</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 text-[10px] text-[#737373]">
        <span className="font-medium text-black">Excel · Looker Studio</span>
        <span>AOV & Inventory Dashboard</span>
      </div>
    </div>
  );
}

export function SuperstoreSalesCardVisual() {
  return (
    <div className="w-full h-full bg-white p-5 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-wide uppercase text-black">
            Sales & Profitability
          </span>
        </div>
        <span className="text-[10px] font-medium text-[#737373]">
          PAR Framework
        </span>
      </div>

      {/* KPI & Mini Table / Chart */}
      <div className="py-2 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="p-2 rounded-lg bg-[#F8F9FA] border border-black/5">
            <span className="text-[8.5px] text-[#666666] uppercase block font-medium">Margin Trend</span>
            <span className="text-[14px] font-semibold text-[#EF4444] tracking-tight">-4.2% Discount Flag</span>
          </div>
          <div className="p-2 rounded-lg bg-[#F8F9FA] border border-black/5">
            <span className="text-[8.5px] text-[#666666] uppercase block font-medium">Regional Pivot</span>
            <span className="text-[14px] font-semibold text-black tracking-tight">4 Territories</span>
          </div>
        </div>

        {/* Mini Discount vs Profit Chart */}
        <div className="h-16 flex items-end gap-2 pt-1 border-b border-[#F0F0F0]">
          <div className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
            <div className="w-full bg-[#2563EB] rounded-t-xs" style={{ height: '85%' }} />
            <span className="text-[8px] text-[#737373]">East</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
            <div className="w-full bg-[#2563EB] rounded-t-xs" style={{ height: '92%' }} />
            <span className="text-[8px] text-[#737373]">West</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
            <div className="w-full bg-[#E5E5E5] rounded-t-xs" style={{ height: '55%' }} />
            <span className="text-[8px] text-[#737373]">Central</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
            <div className="w-full bg-[#EF4444] rounded-t-xs" style={{ height: '40%' }} />
            <span className="text-[8px] text-[#737373]">South</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 text-[10px] text-[#737373]">
        <span className="font-medium text-black">Microsoft Excel</span>
        <span>PivotTable & Slicers Modeling</span>
      </div>
    </div>
  );
}

export function NycTrafficCardVisual() {
  return (
    <div className="w-full h-full bg-white p-5 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-wide uppercase text-black">
            NYC Traffic Safety
          </span>
        </div>
        <span className="text-[10px] font-medium text-[#737373]">
          238,000+ Incidents
        </span>
      </div>

      {/* Incident Pattern & Root Cause Grid */}
      <div className="py-2 flex-1 flex flex-col justify-center">
        <div className="p-2 rounded-lg bg-[#F8F9FA] border border-black/5 mb-2.5">
          <div className="flex justify-between text-[9px] text-[#666666] mb-1 font-mono">
            <span>FACTOR</span>
            <span>SHARE</span>
          </div>
          <div className="space-y-1 font-mono text-[9px]">
            <div className="flex justify-between text-[#111111]">
              <span>Distraction</span>
              <span className="font-semibold">31.4%</span>
            </div>
            <div className="flex justify-between text-[#111111]">
              <span>Following Too Closely</span>
              <span className="font-semibold">18.2%</span>
            </div>
            <div className="flex justify-between text-[#111111]">
              <span>Failure to Yield</span>
              <span className="font-semibold">14.6%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-[#737373] px-1">
          <span>XLOOKUP & Pivot Charts</span>
          <span className="text-[#F59E0B] font-semibold">Peak: 16:00–19:00</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 text-[10px] text-[#737373] border-t border-[#F0F0F0]">
        <span className="font-medium text-black">Microsoft Excel</span>
        <span>Root Cause Safety Analysis</span>
      </div>
    </div>
  );
}

export function ProjectCardVisual({ id }: { id: string }) {
  switch (id) {
    case 'pizza-sales':
      return <PizzaSalesCardVisual />;
    case 'superstore-sales':
      return <SuperstoreSalesCardVisual />;
    case 'nyc-traffic':
      return <NycTrafficCardVisual />;
    default:
      return <PizzaSalesCardVisual />;
  }
}
