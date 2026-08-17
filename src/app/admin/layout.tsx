import React from "react";
import { 
  LayoutDashboard, Users, Wrench, TerminalSquare, Layers, 
  ShoppingCart, CreditCard, Receipt, BarChart3, ShieldAlert, Settings 
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const adminLinks = [
  { label: "Tableau de bord", href: "/admin", icon: <LayoutDashboard /> },
  { label: "Utilisateurs", href: "/admin/users", icon: <Users /> },
  { label: "Outils IA", href: "/admin/tools", icon: <Wrench /> },
  { label: "Prompts", href: "/admin/prompts", icon: <TerminalSquare /> },
  { label: "Ressources", href: "/admin/resources", icon: <Layers /> },
  { label: "Commandes", href: "/admin/orders", icon: <ShoppingCart /> },
  { label: "Abonnements", href: "/admin/subscriptions", icon: <CreditCard /> },
  { label: "Transactions", href: "/admin/transactions", icon: <Receipt /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 /> },
  { label: "Modération", href: "/admin/moderation", icon: <ShieldAlert /> },
  { label: "Paramètres", href: "/admin/settings", icon: <Settings /> },
];

const adminUser = {
  name: "Admin",
  role: "Super Admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout links={adminLinks} user={adminUser} showAddButton={true}>
      {children}
    </DashboardLayout>
  );
}
