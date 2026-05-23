'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface RevenueChartProps {
  data: Array<{
    name: string;
    revenus: number;
    ventes: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-1">Revenus & Ventes</h3>
        <p className="text-sm text-neutral-500">Évolution sur les 7 derniers jours</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD11A" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FFD11A" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis 
            dataKey="name" 
            stroke="#A3A3A3"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#A3A3A3"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenus" 
            stroke="#FFD11A" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenus)" 
            name="Revenus (€)"
          />
          <Area 
            type="monotone" 
            dataKey="ventes" 
            stroke="#3B82F6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorVentes)" 
            name="Ventes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
