import React from "react";
import { 
  LayoutDashboard, Wrench, TerminalSquare, Layers, 
  ShoppingCart, DollarSign, BarChart3, Star, MessageSquare, Settings 
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const contributorLinks = [
  { label: "Tableau de bord", href: "/dashboard/contributor", icon: <LayoutDashboard /> },
  { label: "Mes outils", href: "/dashboard/contributor/tools", icon: <Wrench /> },
  { label: "Mes prompts", href: "/dashboard/contributor/prompts", icon: <TerminalSquare /> },
  { label: "Mes ressources", href: "/dashboard/contributor/resources", icon: <Layers /> },
  { label: "Mes ventes", href: "/dashboard/contributor/sales", icon: <ShoppingCart /> },
  { label: "Mes revenus", href: "/dashboard/contributor/earnings", icon: <DollarSign /> },
  { label: "Stats", href: "/dashboard/contributor/stats", icon: <BarChart3 /> },
  { label: "Avis", href: "/dashboard/contributor/reviews", icon: <Star /> },
  { label: "Messages", href: "/dashboard/contributor/messages", icon: <MessageSquare /> },
  { label: "Paramètres", href: "/dashboard/contributor/settings", icon: <Settings /> },
];

const contributorUser = {
  name: "John Doe",
  role: "Contributeur",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
};

export default function ContributorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout links={contributorLinks} user={contributorUser} showAddButton={true}>
      {children}
    </DashboardLayout>
  );
}
