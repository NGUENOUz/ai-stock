'use client';

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';

interface CategoryDistributionProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = ['#FFD11A', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function CategoryDistribution({ data }: CategoryDistributionProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-1">Répartition par Catégorie</h3>
        <p className="text-sm text-neutral-500">Distribution des formations</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
