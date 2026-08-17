import React from "react";
import { 
  Home, Wrench, TerminalSquare, Layers, 
  FolderHeart, Heart, Download, History, CreditCard 
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const userLinks = [
  { label: "Accueil", href: "/dashboard/user", icon: <Home /> },
  { label: "Outils IA", href: "/dashboard/user/tools", icon: <Wrench /> },
  { label: "Prompts", href: "/dashboard/user/prompts", icon: <TerminalSquare /> },
  { label: "Ressources", href: "/dashboard/user/resources", icon: <Layers /> },
  { label: "Collections", href: "/dashboard/user/collections", icon: <FolderHeart /> },
  { label: "Favoris", href: "/dashboard/user/favorites", icon: <Heart /> },
  { label: "Téléchargements", href: "/dashboard/user/downloads", icon: <Download /> },
  { label: "Historique", href: "/dashboard/user/history", icon: <History /> },
  { label: "Abonnements", href: "/dashboard/user/subscriptions", icon: <CreditCard /> },
];

const normalUser = {
  name: "Alex Martin",
  role: "Visiteur",
  avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop"
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout links={userLinks} user={normalUser} showAddButton={false}>
      {children}
    </DashboardLayout>
  );
}
