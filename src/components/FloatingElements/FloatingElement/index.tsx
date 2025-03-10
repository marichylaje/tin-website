import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { useRandomPosition } from "../../../hooks/useRandomPosition";

// 🎨 Estilos para FloatingImage con valores de `top` y `left`
const FloatingImage = styled.img<{ top: number; left: number }>`
  z-index: 12;
  height: 10vw;
  width: auto;
  position: absolute;
  cursor: grab;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

export default function FloatingElement({
  image,
  floatingRef,
}: {
  image: string;
  floatingRef: React.RefObject<HTMLDivElement>;
}) {
  const { generateRandomPosition, position } = useRandomPosition(floatingRef);
  const [dragPosition, setDragPosition] = useState({ x: position.left, y: position.top });

  useEffect(() => {
    generateRandomPosition();
  }, [image]);

  useEffect(() => {
    setDragPosition({ x: position.left, y: position.top });
    console.log("Updated Position:", position);
  }, [position]);

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    setDragPosition({ x: data.x, y: data.y });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Draggable
      position={{ x: dragPosition.x, y: dragPosition.y }}
      onDrag={handleDrag}
      bounds="parent"
    >
      <FloatingImage
        src={image}
        alt="Floating Element"
        top={dragPosition.y}
        left={dragPosition.x}
        onClick={handleClick}
      />
    </Draggable>
  );
}
