"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe"; 
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled, IconChevronRight } from "@tabler/icons-react";

// --- Images de remplacement pour le rendu visuel ---
const PROMPT_IMAGES = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=300",
  "https://images.unsplash.com/photo-1684158114929-195971939886?auto=format&fit=crop&q=80&w=300"
];

const YOUTUBE_THUMB = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Hub d'Outils AI",
      description: "Gérez et intégrez les meilleurs outils d'intelligence artificielle du marché en un seul endroit.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-100",
    },
    {
      title: "Prompts Pro",
      description: "Des milliers de prompts testés et optimisés pour vos créations.",
      skeleton: <SkeletonTwo />,
      className: "col-span-1 lg:col-span-2 border-b border-neutral-100",
    },
    {
      title: "Formations Certifiantes",
      description: "Maîtrisez l'IA avec des cours vidéo et du coaching d'experts.",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-100",
    },
    {
      title: "L'IA n'a pas de frontière",
      description: "Exploitez le potentiel de l'IA où que vous soyez dans le monde.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-neutral-100",
    },
  ];

  return (
    <section className="relative py-24 lg:py-40 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-black leading-tight">
            Au-delà des outils, <br />
            <span className="text-primary italic">le futur</span> à votre portée
          </h2>
          <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
            Accédez à une puissance d'IA illimitée : des prompts testés, des formations certifiantes, et une communauté qui repousse les frontières.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 border border-neutral-100 rounded-[2.5rem] overflow-hidden bg-neutral-50/30 shadow-sm">
          {features.map((feature, index) => (
            <FeatureCard key={index} className={feature.className}>
              <div className="relative z-20">
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </div>
              <div className="mt-8">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn("p-8 group hover:bg-white transition-colors duration-500", className)}>
    {children}
  </div>
);

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
  <h3 className="text-xl font-bold text-black tracking-tight">{children}</h3>
);

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
  <p className="text-sm text-neutral-500 mt-2 max-w-62.5">{children}</p>
);

// --- Squelette 1 : Hub avec liste d'outils ---
export const SkeletonOne = () => (
  <div className="relative h-60 w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm overflow-hidden">
    <div className="flex items-center gap-2 mb-6">
      <div className="h-2 w-2 rounded-full bg-red-400" />
      <div className="h-2 w-2 rounded-full bg-yellow-400" />
      <div className="h-2 w-2 rounded-full bg-green-400" />
    </div>
    <div className="space-y-3">
      {[
        { name: "ChatGPT 4.0", status: "Connecté" },
        { name: "Midjourney V6", status: "Actif" },
        { name: "Claude 3.5 Sonnet", status: "Connecté" }
      ].map((tool, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100 group-hover:border-primary/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-neutral-700">{tool.name}</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-medium uppercase">{tool.status}</span>
        </div>
      ))}
    </div>
  </div>
);

// --- Squelette 2 : Galerie de photos inclinée ---
export const SkeletonTwo = () => (
  <div className="relative h-60 w-full overflow-hidden flex items-center justify-center">
    <div className="grid grid-cols-2 gap-3 rotate-12 translate-x-4">
      {PROMPT_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.1, rotate: 0 }}
          className="w-24 h-24 rounded-xl border-4 border-white shadow-lg overflow-hidden shrink-0 bg-neutral-100"
        >
          <img src={img} alt="AI Gallery" className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </div>
    <div className="absolute inset-0 bg-linear-to-t from-neutral-50/50 to-transparent pointer-events-none" />
  </div>
);

// --- Squelette 3 : Lecteur Vidéo ---
export const SkeletonThree = () => (
  <div className="relative h-60 flex items-center justify-center p-4">
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl group/video border-4 border-white bg-neutral-100">
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10">
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl group-hover/video:scale-110 transition-transform cursor-pointer">
          <IconBrandYoutubeFilled className="w-7 h-7 text-black" />
        </div>
      </div>
      <img src={YOUTUBE_THUMB} alt="Thumbnail" className="w-full h-full object-cover" />
    </div>
  </div>
);

// --- Squelette 4 : Le Globe ---
export const SkeletonFour = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0.1,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [255/255, 209/255, 26/255],
      glowColor: [245/255, 245/255, 247/255],
      markers: [
        { location: [48.8566, 2.3522], size: 0.08 },
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [35.6762, 139.6503], size: 0.08 },
        { location: [4.0511, 9.7679], size: 0.08 },
      ],
      onRender: (state) => {
        state.phi += 0.005;
      },
    });
    return () => globe.destroy();
  }, []);

  return (
    <div className="h-64 w-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          style={{ width: "400px", height: "400px", maxWidth: "100%" }}
          className="opacity-90"
        />
      </div>
    </div>
  );
};