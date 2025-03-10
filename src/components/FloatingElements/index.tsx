import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRandomPosition } from "../../hooks/useRandomPosition";
import { useRandomImage } from "../../hooks/useRandomImage";
//import FloatingElement from "./FloatingElement";

const MainVideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const StyledDiv = styled.div`
  z-index: 11;
  width: 55%;
  height: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const FloatingSpace = styled.div`
  width: 80%;
  height: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;


export default function FloatingElements({
  mainVideo,
  floatingItems,
}: {
  mainVideo: ReactNode;
  floatingItems: {
    character: string | null;
    gif: string | null;
    background: string | null;
  } | null;
}) {
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const redZoneRef = useRef<HTMLDivElement | null>(null);
  const { generateRandomPosition } = useRandomPosition(floatingRef);
  const { changeImage } = useRandomImage();

  // 🔹 Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    generateRandomPosition();
    changeImage();
    console.log({floatingItems})
  }, []); 

  const handleOnClick = () => {
    generateRandomPosition();
    changeImage();
  };

  return (
    <MainVideoContainer onClick={handleOnClick}>
      <FloatingSpace ref={floatingRef}>
        <StyledDiv ref={redZoneRef}>{mainVideo}</StyledDiv>

        {/* Renderiza cada FloatingElement si existe */}
        {
          /**
           * {floatingItems.character && (
          <FloatingElement image={floatingItems.character} redZoneRef={redZoneRef} floatingRef={floatingRef} />
        )}
        {floatingItems.gif && (
          <FloatingElement image={floatingItems.gif} redZoneRef={redZoneRef} floatingRef={floatingRef} />
        )}
        {floatingItems.background && (
          <FloatingElement image={floatingItems.background} redZoneRef={redZoneRef} floatingRef={floatingRef} />
        )}
           */
        }
      </FloatingSpace>
    </MainVideoContainer>
  );
}
