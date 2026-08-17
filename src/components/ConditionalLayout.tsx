'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/footer';
import HeaderComponent from '@/components/header';
import BottomNav from '@/components/BottomNav';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
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

  // Sinon, on affiche le layout normal avec header, footer et bottom nav mobile
  return (
    <>
      <HeaderComponent />
      <main className={cn(
        "relative flex flex-col min-h-screen",
        // Padding bottom sur mobile pour ne pas masquer le contenu sous le bottom nav
        "pb-20 lg:pb-0"
      )}>
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </main>
      <Footer />
      {/* Bottom navigation — mobile only */}
      <BottomNav />
    </>
  );
}

