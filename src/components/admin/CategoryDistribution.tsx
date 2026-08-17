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

// Palette de couleurs harmonieuses et soft
const COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'];

export default function CategoryDistribution({ data }: CategoryDistributionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Répartition par Catégorie</h3>
        <p className="text-sm text-gray-500">Distribution des formations</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            style={{ fontSize: '12px', fontWeight: '600' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(8px)',
              fontWeight: '600'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', fontWeight: '600' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
