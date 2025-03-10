import React, { useState, useEffect, ReactNode, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Loading from "../Loading";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FullScreenContainer = styled.div<{ $show: boolean }>`  
  width: 90vw;
  height: 85vh;
  background-color: transparent;
  position: fixed;
  top: 2rem;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  animation: ${({ $show }) => ($show ? fadeIn : "none")} 1s ease-in-out;

  @media (min-width: 768px) {
    margin: 6rem;
  }

  @media (max-width: 767px) {
    margin: 0;
  }
`;

const RandomPositionWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  opacity: ${({ top, left }) => (top === 0 && left === 0 ? "0" : "1")};
  transition: opacity 0.3s ease-in-out;

  min-width: 40vw; /* Mínimo 40% del ancho de la pantalla */
  min-height: 40vw; /* Puedes cambiar esto si necesitas un mínimo de altura */
  display: flex;
  justify-content: center;
  align-items: center;
`;

type RandomPlaceProps = {
  children: ReactNode;
};

const RandomPlace: React.FC<RandomPlaceProps> = ({ children }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isLoading, setIsLoading] = useState(true);
  const [showContainer, setShowContainer] = useState(false); // Estado para la aparición con delay
  const childRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowContainer(true);
    }, 1000); // Retraso de 1 segundo
  }, []);

  useEffect(() => {
    if (childRef.current) {
      const { offsetWidth, offsetHeight } = childRef.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  useEffect(() => {
    setIsLoading(true);

    const maxWidth = window.innerWidth - size.width;
    const maxHeight = window.innerHeight - size.height;

    setTimeout(() => {
      setPosition({
        top: Math.random() * maxHeight,
        left: Math.random() * maxWidth,
      });

      setIsLoading(false);
    }, 450);
  }, [size]);

  if ((position.top === 0 && position.left === 0) || isLoading) return <Loading />;

  return (
    <FullScreenContainer $show={showContainer}>
      <RandomPositionWrapper ref={childRef} top={position.top} left={position.left}>
        {children}
      </RandomPositionWrapper>
    </FullScreenContainer>
  );
};

export default RandomPlace;
