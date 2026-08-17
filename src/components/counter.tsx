"use client";
import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({
  value,
  direction = "up",
}: {
  value: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() =>
    springValue.on("change", (latest) => {
      if (ref.current) {
        let formatted = Intl.NumberFormat("en-US").format(Number(latest.toFixed(0)));
        ref.current.textContent = formatted;
      }
    })
  , [springValue]);

  return <span ref={ref} />;
}
