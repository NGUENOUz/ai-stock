// src/components/FeaturesSectionDemo.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
// Assurez-vous que cobe et Framer Motion sont bien installés
import createGlobe from "cobe"; 
import { motion } from "framer-motion"; // Remplacé motion/react par framer-motion
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

// --- Images Fictives (à remplacer par vos assets) ---
const PROMPT_IMAGES = [
  "https://image.pollinations.ai/prompt/Golden,glowing,abstract,AI,creation,dark,glassmorphism?width=500&height=500&seed=10",
  "https://image.pollinations.ai/prompt/Futuristic,AI,generated,cityscape,dark,gold,neon,glowing?width=500&height=500&seed=11",
  "https://image.pollinations.ai/prompt/Intricate,golden,circuitry,network,on,a,dark,background?width=500&height=500&seed=12",
  "https://image.pollinations.ai/prompt/Abstract,data,visualization,gold,and,blue,on,black?width=500&height=500&seed=13",
  "https://image.pollinations.ai/prompt/AI,brain,glowing,golden,filaments,dark,scene?width=500&height=500&seed=14",
];
const YOUTUBE_THUMBNAIL = "https://image.pollinations.ai/prompt/AI,training,course,thumbnail,with,golden,lines,and,futuristic,HUD,elements?width=800&height=450&seed=30";


export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Hub d'Outils AI",
      description: "Gérez et intégrez les meilleurs outils d'intelligence artificielle du marché en un seul endroit. Un contrôle total sur votre workflow.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Prompts Pro & Illimités",
      description:
        "Accédez à une librairie de milliers de prompts testés et optimisés pour la création d'images, la productivité et le marketing.",
      skeleton: <SkeletonTwo images={PROMPT_IMAGES} />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Formations Certifiantes",
      description:
        "Maîtrisez les dernières techniques d'IA avec des cours vidéo, des tutoriels interactifs et des sessions de coaching par des experts.",
      skeleton: <SkeletonThree youtubeThumbnail={YOUTUBE_THUMBNAIL} />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "L'IA n'a pas de frontière",
      description:
        "Exploitez à 100% le potentiel de l'IA où que vous soyez dans le monde et faites de vos rêves une réalité plus vite que ce que vous avez imaginé.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        {/* Titre avec Dégradé Gold/Blanc */}
        <h4 className="
          text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-extrabold 
          text-transparent bg-clip-text bg-gradient-to-b from-[#ffff] via-[#dddd] to-[#FFD700]
        ">
          Au-delà des outils, nous vous rapprochons du futur
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-center font-normal text-neutral-400">
          Accédez à une puissance d'IA illimitée : des prompts testés, des formations certifiantes, et une communauté qui repousse les frontières.
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Composants Structurels (Inchangés) ---

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-400 text-center font-normal",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

// --- Skeletons Adaptés ---

export const SkeletonOne = () => {
  return (
    // Adapté pour représenter un Dashboard/Hub d'Outils IA
    <div className="relative flex py-8 px-2 gap-10">
      <div className="w-full p-4 mx-auto bg-neutral-900/50 backdrop-blur-sm border border-yellow-400/20 shadow-2xl group rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-yellow-400/20">
            <h5 className="text-lg font-semibold text-yellow-400">Dashboard</h5>
            <span className="text-xs text-gray-500">Actif: 3 outils</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-neutral-800/70 rounded">
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-yellow-600 rounded-full animate-pulse" />
                  <p className="text-sm text-white">{i === 1 ? "Prompt Hub" : i === 2 ? "Formation" : "GPT-4"}</p>
                </div>
                <span className="text-xs text-green-400">Connecté</span>
              </div>
            ))}
          </div>
          <button className="w-full py-2 mt-4 text-sm font-bold text-black bg-yellow-400 rounded hover:bg-yellow-500 transition">
            Gérer les Outils
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-black via-black/80 to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-10 inset-x-0 h-60 bg-gradient-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = ({ images }: { images: string[] }) => {
  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    // Prompts Pro : Galeries d'images générées par IA
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-yellow-700 border border-yellow-400/50 shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="Prompts Pro Gallery Image"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-yellow-700 border border-yellow-400/50 shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="Prompts Pro Gallery Image"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black via-black/50 to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black via-black/50 to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = ({ youtubeThumbnail }: { youtubeThumbnail: string }) => {
  return (
    // Formations Certifiantes : Mise en avant d'une vidéo YouTube
    <a
      href="https://www.youtube.com/user/votre-chaine-formation" // Remplacez par votre lien YouTube
      target="__blank"
      className="relative flex gap-10  h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
          <img
            src={youtubeThumbnail} // Image Fictive
            alt="Formation Youtube Thumbnail"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:opacity-80 transition-all duration-200"
          />
        </div>
      </div>
    </a>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      // Couleurs adaptées au thème Gold/Dark
      baseColor: [0.1, 0.1, 0.1], // Très sombre
      markerColor: [1, 0.8, 0.1], // Or (Yellow/Gold)
      glowColor: [1, 0.8, 0.1], // Lueur Or
      markers: [
        // longitude latitude - Marqueurs sur la carte
        { location: [34.0522, -118.2437], size: 0.1 }, // Los Angeles
        { location: [51.5074, 0.1278], size: 0.1 }, // Londres
        { location: [48.8566, 2.3522], size: 0.1 }, // Paris
        { location: [35.6895, 139.6917], size: 0.1 }, // Tokyo
      ],
      onRender: (state: any) => {
        state.phi = phi;
        phi += 0.005; // Vitesse de rotation légèrement réduite
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};