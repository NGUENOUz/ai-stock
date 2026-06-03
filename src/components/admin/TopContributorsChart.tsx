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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Top Contributeurs</h3>
        <p className="text-sm text-gray-500">Classement par ventes</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px', fontWeight: '500' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px', fontWeight: '500' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '13px', fontWeight: '600' }}
          />
          <Bar 
            dataKey="ventes" 
            fill="#8B5CF6" 
            radius={[8, 8, 0, 0]}
            name="Ventes"
          />
          <Bar 
            dataKey="revenus" 
            fill="#3B82F6" 
            radius={[8, 8, 0, 0]}
            name="Revenus (€)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
