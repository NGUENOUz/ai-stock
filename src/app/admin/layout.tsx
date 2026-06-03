'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAppStore } from '@/store/useAppStore';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const role = useAppStore((s) => s.role);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isLoggedIn || role !== 'admin') {
      router.replace('/login');
    }
  }, [hydrated, isLoggedIn, role, router]);

  if (!hydrated) return null;
  if (!isLoggedIn || role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
}
