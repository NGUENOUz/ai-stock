"use client";

import React, { useState } from "react";
import Link from "next/link";
import Confetti from "react-confetti";
import {
  IconCrown,
  IconCopy,
  IconSparkles,
  IconArrowRight,
  IconLock,
  IconLogin,
} from "@tabler/icons-react";

// Remplace par ton vrai store Zustand dans l’intégration réelle
const useAppStore = () => ({
  setHasSeenTour: (page: any, seen: any) => {
    // Logique Zustand / localStorage → ici simulation
    console.log(`ZUSTAND: Marque le tour ${page} comme vu.`);
  },
});

export interface SlideData {
  title: string;
  description: string;
  icon: React.FC<any>;
}

export interface OnboardingTourProps {
  slides: SlideData[];
  pageTitle: string;
  pageId: "prompts" | "formations";
  onFinish?: () => void;
}

interface SlideComponentProps extends SlideData {
  index: number;
  totalSlides: number;
  onNext: () => void;
  pageId: "prompts" | "formations";
  onFinish?: () => void;
}

// Composant Slide avec animation confetti + fermeture
const Slide: React.FC<SlideComponentProps> = ({
  index, totalSlides, title, description, icon: Icon, onNext, pageId, onFinish,
}) => {
  const isLast = index === totalSlides - 1;
  const { setHasSeenTour } = useAppStore();
  const [showParty, setShowParty] = useState(false);
  const [showOnboard, setShowOnboard] = useState(true);

  const handleEssaiClick = () => {
    setHasSeenTour(pageId, true);
    setShowParty(true);
    setTimeout(() => {
      setShowParty(false);
      setShowOnboard(false);
      if (onFinish) onFinish();
    }, 1500);
  };

  const handleCloseAndStore = () => {
    setHasSeenTour(pageId, true);
    setShowOnboard(false);
    if (onFinish) onFinish();
  };

  if (!showOnboard) return null;

  return (
    <div className="flex flex-col items-center p-8 text-center relative">
      {showParty && (
        <>
          <Confetti numberOfPieces={120} recycle={false} />
          <IconSparkles className="w-12 h-12 text-yellow-400 animate-bounce absolute top-2 left-1/2 transform -translate-x-1/2 z-20" />
        </>
      )}
      <Icon className="w-16 h-16 text-yellow-400 mb-6 drop-shadow-[0_0_12px_rgba(255,215,100,0.7)]" />
      <h2 className="text-3xl font-extrabold text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-300 mb-8 max-w-sm">{description}</p>
      <div className="flex space-x-2 mb-8">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-yellow-500" : "w-2 bg-neutral-700"}`}
          />
        ))}
      </div>
      <div className="flex flex-col space-y-3 w-full max-w-sm">
        {!isLast ? (
          <button
            onClick={onNext}
            className="flex items-center justify-center text-black bg-yellow-500 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Suivant <IconArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <>
            <button
              onClick={handleEssaiClick}
              className="flex items-center justify-center bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition duration-300 relative"
            >
              <IconSparkles className="w-5 h-5 mr-2" /> Essayer l'Essai Gratuit
            </button>
            <Link
              href="/pricing"
              onClick={handleCloseAndStore}
              className="text-white flex items-center justify-center bg-neutral-700 px-6 py-3 rounded-xl font-bold hover:bg-neutral-600 transition duration-300"
            >
              Prendre un Abonnement
            </Link>
            <Link
              href="/login"
              onClick={handleCloseAndStore}
              className="flex items-center justify-center text-gray-400 text-sm hover:text-white mt-2 transition duration-200"
            >
              <IconLogin className="w-4 h-4 mr-1" /> J'ai déjà un compte
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const OnboardingTour: React.FC<OnboardingTourProps> = ({
  slides, pageTitle, pageId, onFinish
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideData = slides[currentSlide];
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    else if (onFinish) onFinish();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
      <div className="relative rounded-3xl w-full max-w-lg bg-white/10 dark:bg-neutral-900/40 backdrop-blur-3xl border border-white/22 shadow-[0_20px_60px_rgba(255,215,120,0.28)] p-6">
        <Slide
          index={currentSlide}
          totalSlides={slides.length}
          title={currentSlide === 0 ? `Bienvenue sur ${pageTitle}` : currentSlideData.title}
          description={currentSlideData.description}
          icon={currentSlideData.icon}
          onNext={nextSlide}
          pageId={pageId}
          onFinish={onFinish}
        />
      </div>
    </div>
  );
};

export default OnboardingTour;
