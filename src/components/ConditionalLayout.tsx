'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/footer';
import HeaderComponent from '@/components/header';
import { cn } from '@/lib/utils';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  // Si c'est une route admin, dashboard ou auth, on retourne juste les enfants sans header/footer
  if (isAdminRoute || isDashboardRoute || isAuthRoute) {
    return <>{children}</>;
  }

  // Sinon, on affiche le layout normal avec header et footer
  return (
    <>
      <HeaderComponent />
      <main className="relative flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
