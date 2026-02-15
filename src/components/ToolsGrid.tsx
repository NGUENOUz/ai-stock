// src/components/home/ToolsGrid.tsx

import { ToolCard } from "./ToolCard";

const tools = [
  { title: "ChatGPT", category: "Chatbot", description: "L'assistant IA le plus polyvalent pour la rédaction et le code.", rating: 4.9 },
  { title: "Midjourney", category: "Image Generation", description: "Créez des images artistiques époustouflantes à partir de textes.", rating: 4.8 },
  { title: "Claude 3", category: "Chatbot", description: "Une IA avancée avec une grande fenêtre de contexte et un ton naturel.", rating: 4.9 },
  { title: "Leonardo AI", category: "Image Generation", description: "Plateforme complète pour la création d'assets visuels pro.", rating: 4.7 },
  { title: "Perplexity", category: "Search Engine", description: "Le moteur de recherche du futur assisté par l'IA.", rating: 4.6 },
  { title: "Suno AI", category: "Music", description: "Générez des chansons complètes avec paroles et voix en un clic.", rating: 4.8 },
];

export const ToolsGrid = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Les outils IA qui <span className="text-primary italic">dominent</span> le marché
          </h2>
          <p className="text-neutral-500 text-lg">
            Notre sélection rigoureuse des meilleures solutions pour booster votre productivité.
          </p>
        </div>
        <button className="px-6 py-3 rounded-full border border-neutral-200 font-bold hover:bg-neutral-50 transition-all">
          Voir tout l'annuaire
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <ToolCard key={i} {...tool} />
        ))}
      </div>
    </section>
  );
};