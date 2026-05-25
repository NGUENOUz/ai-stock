'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAppStore } from '@/store/useAppStore';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const role = useAppStore((s) => s.role);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, role, router]);

  if (!isLoggedIn || role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
}
