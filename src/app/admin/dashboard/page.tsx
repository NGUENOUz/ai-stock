'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import TopContributorsChart from '@/components/admin/TopContributorsChart';
import { 
  DollarSign, 
  Users, 
  GraduationCap, 
  TrendingUp,
  Download,
  Eye,
  Clock,
  ShoppingBag,
  ArrowUpRight,
  MoreVertical,
  Play,
  BookOpen
} from 'lucide-react';

// Données mockées pour la démo
const revenueData = [
  { name: 'Lun', revenus: 4200, ventes: 24 },
  { name: 'Mar', revenus: 3800, ventes: 18 },
  { name: 'Mer', revenus: 5100, ventes: 32 },
  { name: 'Jeu', revenus: 4600, ventes: 28 },
  { name: 'Ven', revenus: 6200, ventes: 42 },
  { name: 'Sam', revenus: 5800, ventes: 38 },
  { name: 'Dim', revenus: 4900, ventes: 31 },
];

const topContributors = [
  { name: 'Marie D.', ventes: 156, revenus: 12400 },
  { name: 'Jean P.', ventes: 142, revenus: 11200 },
  { name: 'Sophie L.', ventes: 128, revenus: 9800 },
  { name: 'Thomas M.', ventes: 98, revenus: 7600 },
  { name: 'Claire B.', ventes: 87, revenus: 6900 },
];

const recentCourses = [
  {
    title: "Beginner's Guide To Becoming A Professional Frontend Developer",
    instructor: "Prashant Kumar Singh",
    category: "DESIGN",
    categoryColor: "bg-purple-100 text-purple-700",
    thumbnail: "from-purple-500 to-indigo-600",
    views: "2.3k",
    duration: "4h 20min"
  },
  {
    title: "Mastering ChatGPT & Advanced AI Prompting Techniques",
    instructor: "Sophie Martin",
    category: "IA",
    categoryColor: "bg-amber-100 text-amber-700",
    thumbnail: "from-amber-500 to-orange-600",
    views: "1.8k",
    duration: "3h 15min"
  },
  {
    title: "Complete Guide to Modern Web Development with React",
    instructor: "Alex Rousseau",
    category: "DEVELOPMENT",
    categoryColor: "bg-blue-100 text-blue-700",
    thumbnail: "from-blue-500 to-cyan-600",
    views: "3.1k",
    duration: "5h 45min"
  },
];

const mentorsList = [
  { name: "Prashant Kumar Singh", role: "Expert Frontend", status: "Active", color: "bg-purple-500" },
  { name: "Sophie Martin", role: "Expert IA", status: "Active", color: "bg-pink-500" },
  { name: "Alex Rousseau", role: "Full Stack Dev", status: "Active", color: "bg-blue-500" },
  { name: "Marie Dubois", role: "UI/UX Designer", status: "Active", color: "bg-emerald-500" },
  { name: "Thomas Petit", role: "Data Scientist", status: "Active", color: "bg-amber-500" },
];

export default function DashboardPage() {
  const { role } = useAppStore();
  const router = useRouter();

  // Protection admin - rediriger les non-admins
  useEffect(() => {
    console.log('🔍 Admin dashboard - Rôle détecté:', role);
    if (role && role !== 'admin') {
      console.log('❌ Accès refusé, redirection vers dashboard user...');
      router.replace('/dashboard');
      return;
    }
  }, [role, router]);

  // Ne pas afficher le contenu si pas admin
  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Accès refusé</h2>
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Simple */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">OVERVIEW</p>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Stats Cards - 4 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Revenus Total"
          value="34 700 €"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="success"
        />
        <StatsCard
          title="Utilisateurs Actifs"
          value="2,847"
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
          color="info"
        />
        <StatsCard
          title="Formations"
          value="156"
          icon={GraduationCap}
          trend={{ value: 3.1, isPositive: false }}
          color="purple"
        />
        <StatsCard
          title="Taux de Conversion"
          value="24.8%"
          icon={TrendingUp}
          trend={{ value: 5.4, isPositive: true }}
          color="primary"
        />
      </div>

      {/* Section Continue Watching Style */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Formations Récentes</h2>
          <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
            See All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
              {/* Thumbnail */}
              <div className={`h-40 bg-gradient-to-br ${course.thumbnail} relative flex items-center justify-center`}>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={24} className="text-white ml-1" />
                </div>
                <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${course.categoryColor}`}>
                  {course.category}
                </span>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 leading-relaxed">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 font-medium truncate">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{course.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart data={revenueData} />
        <TopContributorsChart data={topContributors} />
      </div>

      {/* Your Mentor Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Top Mentors</h2>
          <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
            See All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {mentorsList.map((mentor, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full ${mentor.color} flex items-center justify-center`}>
                  <span className="text-white text-sm font-bold">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{mentor.name}</p>
                  <p className="text-xs text-gray-500">{mentor.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  {mentor.status}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
