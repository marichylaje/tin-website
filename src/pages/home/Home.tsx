import { useEffect, useRef, useState } from "react";
import { useRandomImage } from "../../hooks/useRandomImage";
import videoFile from "/assets/main/Reel_2025_seismotion_FINAL1.mp4";
import openVideo from "/assets/opener/openvid1.webm";
import styled, { keyframes } from "styled-components";
import { FloatingElements } from "../../components";
import Loading from "../../components/Loading";

// 🔄 Animación Fade-in
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 🎥 Contenedor del video principal
const MainVideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;
  overflow: hidden;
  position: relative;
`;

// Estilos para el video principal, responsive
const StyledMainVideo = styled.video`
  width: 75%;
  height: auto;
  border: 1px solid black;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border: none;
  }

  @media (max-width: 480px) {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

// Estilo para el video de apertura (opener)
const StyledVideo = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  overflow: hidden;
  display: block;

  @media (max-width: 768px) {
    object-position: center;
  }
`;

export default function Home({
  isReload,
  setIsReload,
}: {
  isReload: boolean;
  setIsReload: (a: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const openerRef = useRef<HTMLVideoElement | null>(null);
  const { changeImage, isLoading } = useRandomImage();

  const [showLoader, setShowLoader] = useState(false);

  // 🔥 Muestra el Loader cada vez que se cambia la imagen
  const triggerLoader = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
  };

  useEffect(() => {
    changeImage();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 8;
    }
  }, [isReload]);

  const handleGlobalClick = () => {
    if (!isLoading) {
      triggerLoader();
      changeImage();

      if (videoRef.current) {
        const timeOptions = [5, 15, 25, 35, 50, 55];
        const randomSecond = timeOptions[Math.floor(Math.random() * timeOptions.length)];
        videoRef.current.currentTime = randomSecond;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [isLoading]);

  const mainVideo = (
    <StyledMainVideo
      ref={videoRef}
      src={videoFile}
      autoPlay
      loop
      muted
      playsInline
    />
  );

  if (showLoader) return <Loading />;

  return (
    <>
      {isReload ? (
        <StyledVideo
          ref={openerRef}
          src={openVideo}
          autoPlay
          muted
          playsInline
          onCanPlayThrough={(e) => e.currentTarget.play()}
          onEnded={() => setIsReload(false)}
        />
      ) : (
        !isLoading && (
          <MainVideoContainer>
            <FloatingElements mainVideo={mainVideo} floatingItems={null} />
          </MainVideoContainer>
        )
      )}
    </>
  );
}
