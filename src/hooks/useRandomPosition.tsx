import { useState, useEffect } from "react";

export function useRandomPosition(containerRef: React.RefObject<HTMLDivElement>) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const generateRandomPosition = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // Generamos una posición dentro del rango -25vw a +25vw y -30vh a +30vh
    const newLeft = Math.random() * (containerRect.width * 0.8) - (containerRect.width * 0.40);
    const newTop = Math.random() * (containerRect.height * 0.6) - (containerRect.height * 0.1);

    setPosition({ top: newTop, left: newLeft });
  };

  useEffect(() => {
    generateRandomPosition();
  }, []);

  return { position, generateRandomPosition };
}
