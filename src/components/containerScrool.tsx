// src/components/ContainerScroll.tsx
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"; // Correction de l'import pour framer-motion

interface CardProps {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="
        w-full mx-auto h-[30rem] md:h-[40rem] p-2 md:p-6 rounded-[30px] 
        // Style Verre Premium
        bg-white/10 dark:bg-neutral-900/20 
        border border-white/20 dark:border-white/10
        backdrop-blur-3xl 
        shadow-[0_25px_75px_rgba(255,210,120,0.25)] // Ombre Gold
      "
    >
      <div className="
        h-full w-full overflow-hidden 
        rounded-2xl md:rounded-[20px] 
        md:p-4
      ">
        {children}
      </div>
    </motion.div>
  );
};

// --- Composant Principal ContainerScroll ---

interface ContainerScrollProps {
  children: React.ReactNode;
}

export const ContainerScroll: React.FC<ContainerScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Définir les offsets pour un meilleur contrôle
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]); // translate n'est pas utilisé dans Card, mais gardé pour la complétude

  return (
    <div
      className=" flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="w-full relative squelletons"
        style={{
          perspective: "1000px",
        }}
      >
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};