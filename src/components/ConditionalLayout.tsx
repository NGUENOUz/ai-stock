'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/footer';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import AppSidebar from '@/components/layout/AppSidebar';
import TopBanner from '@/components/layout/TopBanner';
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

  // Sinon, on affiche le layout normal avec sidebar et footer
  return (
    <div className="relative flex flex-col min-h-screen font-sans">
      <TopBanner />
      <div className="flex flex-1">
        <AppSidebar />
        <main className={cn(
          "flex-1 flex flex-col w-full min-h-[100vh]",
          // Espace pour la sidebar desktop (lg:280px) et pour le header mobile (pt-16)
          "lg:pl-[280px] pt-16 lg:pt-0"
        )}>
          <div className="flex-1">
            <PageTransitionWrapper>
              {children}
            </PageTransitionWrapper>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

