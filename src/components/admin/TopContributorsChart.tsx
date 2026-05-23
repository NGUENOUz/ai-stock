'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface TopContributorsChartProps {
  data: Array<{
    name: string;
    ventes: number;
    revenus: number;
  }>;
}

export default function TopContributorsChart({ data }: TopContributorsChartProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-1">Top Contributeurs</h3>
        <p className="text-sm text-neutral-500">Classement par ventes</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          <Bar 
            dataKey="ventes" 
            fill="#FFD11A" 
            radius={[8, 8, 0, 0]}
            name="Ventes"
          />
          <Bar 
            dataKey="revenus" 
            fill="#10B981" 
            radius={[8, 8, 0, 0]}
            name="Revenus (€)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
